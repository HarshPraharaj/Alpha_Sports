import json
import numpy as np # type: ignore
import pandas as pd
import requests
import seaborn as sns # type: ignore
from bs4 import BeautifulSoup
from highlight_text import fig_text # type: ignore
from matplotlib import pyplot as plt
from matplotlib.patches import Arc
import matplotlib
matplotlib.use('Agg')

pd.set_option('display.max_rows', 500)
pd.set_option('display.max_columns', 500)


def football_pitch(x_min=0, x_max=105,
                   y_min=0, y_max=68,
                   pitch_color="#f0f0f0",
                   line_color='black',
                   line_thickness=1.5,
                   point_size=20,
                   orientation="horizontal",
                   aspect="full",
                   axis='off',
                   ax=None
                   ):

    if not ax:
        raise TypeError("This function is intended to be used with an existing fig and ax in order to allow flexibility in plotting of various sizes and in subplots.")

    if orientation.lower().startswith("h"):
        first, second, arc_angle = 0, 1, 0
        if aspect == "half":
            ax.set_xlim(x_max / 2, x_max + 5)

    elif orientation.lower().startswith("v"):
        # trunk-ignore(ruff/F841)
        first, second, arc_angle = 1, 0, 90
        if aspect == "half":
            ax.set_ylim(x_max / 2, x_max + 5)

    else:
        raise NameError("You must choose one of horizontal or vertical")

    ax.axis(axis)

    rect = plt.Rectangle((x_min, y_min), # type: ignore
                         x_max, y_max,
                         facecolor=pitch_color,
                         edgecolor="none",
                         zorder=-2)

    ax.add_artist(rect)

    x_conversion = x_max / 100
    y_conversion = y_max / 100

    pitch_x = [x * x_conversion for x in [0, 5.8, 11.5, 17, 50, 83, 88.5, 94.2, 100]]
    pitch_y = [x * y_conversion for x in [0, 21.1, 36.6, 50, 63.2, 78.9, 100]]
    goal_y = [x * y_conversion for x in [45.2, 54.8]]

    # side and goal lines
    lx1 = [x_min, x_max, x_max, x_min, x_min]
    ly1 = [y_min, y_min, y_max, y_max, y_min]

    # outer box
    lx2 = [x_max, pitch_x[5], pitch_x[5], x_max]
    ly2 = [pitch_y[1], pitch_y[1], pitch_y[5], pitch_y[5]]

    lx3 = [0, pitch_x[3], pitch_x[3], 0]
    ly3 = [pitch_y[1], pitch_y[1], pitch_y[5], pitch_y[5]]

    # goals
    lx4 = [x_max, x_max + 2, x_max + 2, x_max]
    ly4 = [goal_y[0], goal_y[0], goal_y[1], goal_y[1]]

    lx5 = [0, -2, -2, 0]
    ly5 = [goal_y[0], goal_y[0], goal_y[1], goal_y[1]]

    # six-yard box
    lx6 = [x_max, pitch_x[7], pitch_x[7], x_max]
    ly6 = [pitch_y[2], pitch_y[2], pitch_y[4], pitch_y[4]]

    lx7 = [0, pitch_x[1], pitch_x[1], 0]
    ly7 = [pitch_y[2], pitch_y[2], pitch_y[4], pitch_y[4]]

    # half-way line
    lx8 = [pitch_x[4], pitch_x[4]]
    ly8 = [0, y_max]

    # penalty spots and arcs
    arc = Arc((pitch_x[6], pitch_y[3]), height=18.3, width=18.3, angle=arc_angle, theta1=310, theta2=50, color=line_color, lw=line_thickness, zorder=2)
    ax.add_patch(arc)
    ax.plot(pitch_x[6], pitch_y[3], 'ko', ms=point_size, zorder=2)

    arc = Arc((pitch_x[2], pitch_y[3]), height=18.3, width=18.3, angle=arc_angle, theta1=130, theta2=230, color=line_color, lw=line_thickness, zorder=2)
    ax.add_patch(arc)
    ax.plot(pitch_x[2], pitch_y[3], 'ko', ms=point_size, zorder=2)

    lines = [
        (lx1, ly1),
        (lx2, ly2),
        (lx3, ly3),
        (lx4, ly4),
        (lx5, ly5),
        (lx6, ly6),
        (lx7, ly7),
        (lx8, ly8)
    ]

    for (l1, l2) in lines:
        ax.plot(l1, l2, color=line_color, lw=line_thickness, zorder=2)

    return ax



def plot_heatmap(player_goals,player_df):
    fig = plt.figure(figsize=(15,20),constrained_layout=True)
    gs = fig.add_gridspec(nrows=1,ncols=2)

    ax = fig.add_subplot(gs[0])
    football_pitch(orientation="vertical",aspect="half",line_color="black",ax=ax)
    sns.kdeplot(player_goals["Y1"],player_goals["X1"], shade=True,color="cyan", levels = 10)

    ax1 = fig.add_subplot(gs[1])
    football_pitch(orientation="vertical",aspect="half",line_color="black",ax=ax1)
    sns.kdeplot(player_df["Y1"],player_df["X1"], shade=True,color="crimson", levels = 10)

    fig_text(0.55,0.66, s="Mo Salah Goals 2020/2021 Season",font='Comic Sans MS',fontsize=20,fontweight="bold",color='crimson')
    fig_text(0.07,0.66, s="Mo Salah Total Shots 2020/2021 Season",font='Comic Sans MS',fontsize=20,fontweight="bold",color='cyan')

    return fig
    

def return_player_df(player_name, plot_df):
    plot_shoots = plot_df[plot_df['player'].str.contains(player_name,case=False)].copy()
    # Changing data types
    plot_shoots['X'] = plot_shoots['X'].astype('float64')
    plot_shoots['Y'] = plot_shoots['Y'].astype('float64')

    # Adjustind dimensions for soccer pitch
    plot_shoots['X1'] = (plot_shoots['X']/100)*105*100
    plot_shoots['Y1'] = (plot_shoots['Y']/100)*68*100

    player_df = plot_shoots.copy()
    player_goals = player_df[player_df['result']=="Goal"].copy()
    print("HARSH LOG")
    # print(player_goals.head())
    op = plot_heatmap(player_goals,player_df)
    
    return op

def return_player_id(player_name,plot_df):
    plot_shoots = plot_df[plot_df['player'].str.contains(player_name,case=False)].copy()
    return plot_shoots.iloc[0]['player_id']

def get_player_data(player_id):
    link = f"https://understat.com/player/{player_id}"
    res = requests.get(link)
    soup = BeautifulSoup(res.content,'lxml')
    scripts = soup.find_all('script')
    # Get the grouped stats data, it's the second script executed in order
    strings = scripts[3].string
    # Getting rid of unnecessary characters from json data
    ind_start = strings.index("('")+2 
    ind_end = strings.index("')") 
    json_data = strings[ind_start:ind_end] 
    json_data = json_data.encode('utf8').decode('unicode_escape')
    data = json.loads(json_data)

    shots = pd.DataFrame(data) # Player shot data

    shots['xG'] = shots['xG'].astype('float64')
    shots['X'] = shots['X'].astype('float64')
    shots['Y'] = shots['Y'].astype('float64')

    shots['X1'] = (shots['X']/100)*105*100
    shots['Y1'] = (shots['Y']/100)*68*100
    # Original X and Y
    shots['X'] = (shots['X']/100)*105*100
    shots['Y'] = (shots['Y']/100)*68*100

    # New dictionaries 
    total_shots = shots[shots.columns[0]].count().tolist() # type: ignore
    xGcum = np.round(max(np.cumsum(shots['xG'])),3).tolist()
    xG_per_shot = np.round(max(np.cumsum(shots['xG']))/(shots[shots.columns[0]].count()),3).tolist()
    goal = shots[shots['result']=='Goal']
    shot_on_post = shots[shots['result']=='ShotOnPost']
    blocked_shot = shots[shots['result']=='BlockedShot']
    saved_shot = shots[shots['result']=='SavedShot']
    missed_shot = shots[shots['result']=='MissedShot']
    goals = goal[goal.columns[0]].count().tolist() # type: ignore

    return total_shots, xGcum, xG_per_shot, goal, shot_on_post, blocked_shot, saved_shot, missed_shot,goals


def plot_player_career_shots(total_shots, xGcum, xG_per_shot, goal, shot_on_post, blocked_shot, saved_shot, missed_shot,goals):
    fig, ax = plt.subplots(figsize=(20, 10))
    football_pitch(orientation="vertical",aspect="half",line_color="black",ax=ax,axis="off")

    #Drawing a full pitch horizontally
    z = goal['xG'].tolist()
    # trunk-ignore(ruff/F841)
    z1 = [500 * i for i in z] # This is to scale the "xG" values for plotting
    # trunk-ignore(ruff/F841)
    color = {'Goal':'cyan', 'MissedShots':'red', 'BlockedShot':'tomato', 'SavedShot':'black', 'ShotOnPost':'Yellow'}
    ## markers = {'Goal':'Star', 'MissedShots':'X', 'BlockedShot':'O', 'SavedShot':'V', 'ShotOnPost':'S'}

    # Plotting the goals, the missed chances shot on post etc 
    plt.scatter(y=goal["X1"],x=goal["Y1"],s=goal['xG']*720, marker='o',color='cyan',edgecolors="black",label='Goals')
    plt.scatter(y=shot_on_post["X1"],x=shot_on_post["Y1"],s=shot_on_post['xG']*720, marker='o',color='yellow',edgecolors="black",label='Shot on Post',alpha=0.5)
    plt.scatter(y=missed_shot["X1"],x=missed_shot["Y1"],s=missed_shot['xG']*720, marker='o',color='red',edgecolors="black",label='Missed Shot',alpha=0.5)
    plt.scatter(y=blocked_shot["X1"],x=blocked_shot["Y1"],s=blocked_shot['xG']*720, marker='o',color='green',edgecolors="black",label='Blocked Shot',alpha=0.5)
    plt.scatter(y=saved_shot["X1"],x=saved_shot["Y1"],s=saved_shot['xG']*720, marker='o',color='purple',edgecolors="black",label='Saved Shot',alpha=0.5)
    #legend 
    # another way to do it 
    #ax.legend(loc='upper center', bbox_to_anchor= (0.13, 0.87),
                #borderaxespad=0, frameon=False)
    legend = ax.legend(loc="upper center",bbox_to_anchor= (0.14, 0.88),labelspacing=1.3,prop={'weight':'bold','size':11})
    legend.legendHandles[0]._sizes = [500] # type: ignore
    legend.legendHandles[1]._sizes = [500] # type: ignore
    legend.legendHandles[2]._sizes = [500] # type: ignore
    legend.legendHandles[3]._sizes = [500] # type: ignore
    legend.legendHandles[4]._sizes = [500] # type: ignore

    # xG Size 
    mSize = [0.05,0.10,0.2,0.4,0.6,0.8]
    mSizeS = [720 * i for i in mSize]
    mx = [60,60,60,60,60,60]
    my = [92,94,96,98,100,102]
    plt.scatter(mx,my,s=mSizeS,facecolors="cyan", edgecolor="black")
    for i in range(len(mx)):
        plt.text(mx[i]+ 2.8, my[i], mSize[i], fontsize=12, color="black",ha="center", va="center",fontweight='bold') # type: ignore
    # Annotation text
    fig_text(0.38,0.91, s="Mo Salah Career Shots\n", fontsize = 25, fontweight = "bold",c='cyan')
    fig_text(0.47,0.37, s="Shots:\n\nxGcum:\n\nxG per shot:\n\nGoals: ", fontsize = 12, fontweight = "bold",c='black')
    fig_text(0.54,0.37, s="<{}\n\n{}\n\n{}\n\n{}>".format(total_shots,xGcum,xG_per_shot,goals), fontsize = 12, fontweight = "bold",c='cyan')
    return fig