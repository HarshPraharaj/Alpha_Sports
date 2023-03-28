import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

def get_players(player_name):
    return ['Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5', 'Player 6', 'Player 7', 'Player 8', 'Player 9', 'Player 10']




player_stats_og = pd.read_csv(r"data/football_rec/player_stats.csv",sep=';',encoding='latin-1')


def drop_