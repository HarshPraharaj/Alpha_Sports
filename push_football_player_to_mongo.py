import pymongo
import pandas as pd
import json

def mongoimport(csv_path, db_name, collection_name, db_url='localhost', db_port=27017):
    """ Imports a csv file at path csv_name to a mongo colection
    returns: count of the documants in the new collection
    """
    client = pymongo.MongoClient(db_url, db_port)
    db = client[db_name]
    collist = db.list_collection_names()
    if 'football_players' in collist:
        coll = db[collection_name]
        coll.drop()
        print('collection dropped')
    coll = db[collection_name]
    data = pd.read_csv(csv_path,sep = ';',encoding = 'latin-1')
    payload = json.loads(data.to_json(orient='records'))
    coll.insert_many(payload)
    print(f'{len(data)} rows inserted')
    
if __name__ == "__main__":
    csv_path = 'data/football_rec/player_stats.csv'
    db_name = 'alpha_sport'
    collection_name = 'football_players'
    mongoimport(csv_path, db_name, collection_name, db_url='localhost', db_port=27017)