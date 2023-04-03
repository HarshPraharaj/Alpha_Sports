import os
import logging
import pandas as pd
import numpy as np # type: ignore
from flask import Flask, render_template, request, jsonify # type: ignore
from pymongo import MongoClient # type: ignore
from flask_cors import CORS, cross_origin
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

# Configure logger to print logs to stdout
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
handler = logging.StreamHandler()
handler.setLevel(logging.INFO)
formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
handler.setFormatter(formatter)
logger.addHandler(handler)

# Configuration settings
RECOMMENDATION_LIMIT = 20

def get_similar_players(rank, num_results=RECOMMENDATION_LIMIT):
    """
    Given a player id, returns a list of the most similar players based on their statistical performance.
    """
    input_vector = stats_vectors.iloc[fw_features.index[fw_features['Rk'] == rank].tolist()[0]].values
    similarity_scores = cosine_similarity([input_vector], stats_vectors)[0]
    closest_rows = fw_features.iloc[np.argsort(similarity_scores)[::-1][:num_results+1]]

    similar_players = []
    for _, row in closest_rows.iterrows():
        player = {
            "id": int(row["Rk"]),
            "name": row["Player"],
            "position": row["Pos"],
            "age": int(row["Age"]),
            "team": row["Squad"],
            "league": row["Comp"],
            "similarity": round(similarity_scores[row.name],4)
        }
        similar_players.append(player)
    return similar_players

def get_mongo_connection():
    """
    Returns a connection to the MongoDB database.
    """
    mongo_connection_string = "mongodb://localhost:27017" #os.getenv('MONGO_CONNECTION_STRING')
    client = MongoClient(mongo_connection_string)
    db = client['alpha_sport']
    return db

# Create a database connection
db = get_mongo_connection()

@app.route('/player-names', methods=['GET'])
def get_player_names():
    """
    Endpoint to retrieve a list of all player names and their corresponding ranks.
    """
    try:
        player_names = list(db.football_players.find({}, {"Player": 1, "Rk": 1, "_id": 0}))
        res = [{"key": player["Rk"], "text": player["Player"], "value": player["Player"]} for player in player_names]
        return jsonify(res)
    except Exception as e:
        logger.exception(f"Error retrieving player names: {str(e)}")
        return jsonify([])

@app.route('/')
def index():
    """
    Endpoint to serve the main page of the application.
    """
    return render_template('index.html')

@app.route('/recommend/<int:player_id>')
@cross_origin(origin='*', headers=['Content-Type'])
def recommend(player_id):
    """
    Endpoint to retrieve a list of recommended players for a given player ID.
    """
    try:
        recommendations = get_similar_players(player_id, RECOMMENDATION_LIMIT)[1:]
        print(recommendations)
        return render_template('results.html', recommendations=recommendations, num_results=RECOMMENDATION_LIMIT)
    except Exception as e:
        logger.exception(f"Error retrieving recommendations for player {player_id}: {str(e)}")
        return render_template('error.html')

if __name__ == '__main__':
    try:
        # Load player stats from MongoDB into a Pandas dataframe
        db = get_mongo_connection()
        player_stats = list(db.football_players.find({}, {"_id": 0}))
        fw_features = pd.DataFrame(player_stats)

        # Normalize feature values
        norms = np.linalg.norm(fw_features.iloc[:, 7:], axis=0)
        norms[norms == 0] = 1e-10
        stats_vectors = fw_features.iloc[:, 7:].apply(lambda x: x/norms, axis=1)

        # Start Flask application
        app.run(debug=True)
    except Exception as e:
        logger.exception(f"Error starting application: {str(e)}")
        raise e
