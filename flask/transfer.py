from helper import return_player_df,return_player_id,plot_player_career_shots,get_player_data
import pandas as pd

plot_df = pd.read_csv('../data/football_rec/shoots.csv')

def transfer_page_plots(player_name):
    
    heatmap_path = f"../alpha-sports_ui/public/images/heatmap_{player_name}.png"
    shot_on_post_path = f"../alpha-sports_ui/public/images/shot_on_post_{player_name}.png"
    last_name = player_name.split(" ")[-1]
    fig_1 = return_player_df(last_name,plot_df)
    player_id = return_player_id(last_name,plot_df)
    total_shots, xGcum, xG_per_shot, goal, shot_on_post, blocked_shot, saved_shot, missed_shot, goals = get_player_data(player_id)
    fig_2 = plot_player_career_shots(total_shots, xGcum, xG_per_shot, goal, shot_on_post, blocked_shot, saved_shot, missed_shot, goals)
    fig_1.savefig(heatmap_path)
    fig_2.savefig(shot_on_post_path)

    return heatmap_path,shot_on_post_path