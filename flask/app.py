from flask import Flask, render_template, request, jsonify
from recommendation import *
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

def get_similar_players(name):

    input_vector = stats_vectors.iloc[fw_features.index[fw_features['Player'] == name].tolist()[0]].values
    similarity_scores = cosine_similarity([input_vector], stats_vectors)[0]
    closest_rows = fw_features.iloc[np.argsort(similarity_scores)[::-1][:20]]
    return closest_rows['Player'].tolist()

player_stats_og = pd.read_csv(r"data/football_rec/player_stats.csv",sep=';',encoding='latin-1')
fw_features = player_stats_og.copy()

norms = np.linalg.norm(fw_features.iloc[:, 7:], axis=0)
norms[norms == 0] = 1e-10

stats_vectors = fw_features.iloc[:, 7:].apply(lambda x: x/norms, axis=1)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/recommend', methods=['POST'])
def recommend():
    player_type = request.form.get('player_type')
    player_name = request.form.get('player_name')
    preferred_foot = request.form.get('preferred_foot')
    num_results = int(request.form.get('num_results'))
    league = request.form.get('league')
    comparison_with = request.form.get('comparison_with')
    age_bracket = int(request.form.get('age_bracket'))

    # Hardcoded recommendations for now
    # recommendations = ['Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5', 'Player 6', 'Player 7', 'Player 8', 'Player 9', 'Player 10']
    
    # Use your ML model to get recommendations based on the input parameters here
    recommendations = get_similar_players(player_name)

    return render_template('results.html', recommendations=recommendations, num_results=20)

if __name__ == '__main__':
    app.run(debug=True)