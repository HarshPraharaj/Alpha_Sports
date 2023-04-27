import React from 'react'
import { useState } from 'react'
import { Card, Container, Grid, Segment } from "semantic-ui-react";
import { Radar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { RadialLinearScale } from "chart.js";


Chart.register(RadialLinearScale);

Object.keys(registerables).forEach((name: any) => {
    Chart.register(registerables[name]);
  });

  function PlayerStatsData(props: { data: any, open: boolean, handleClose: () => void }) {
    const player = props.data;
  
    const data = {
      labels: [
        "three_pointers",
        "two_pointers",
        "blocks",
        "effected_field_goal",
        "field_goals",
        "points"
      ],
      datasets: [
        {
            label:player.name,
            data: [
            player.three_pointers,
            player.two_pointers,
            player.blocks,
            player.effected_field_goal,
            player.field_goals,
            player.points
          ],
          fill: true,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          pointBackgroundColor: "rgba(255, 99, 132, 1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(255, 99, 132, 1)",
        }
    ]
    };
    
    const options = {
      scales: {
        r: {
          angleLines: {
            display: false,
          },
          suggestedMin: 0,
          suggestedMax: 100,
        },
      },
    };
  
    const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
      event.currentTarget.src = 'https://kamarfifa.pl/wp-content/uploads/2020/12/no-face.jpg'
      // 'https://assets.laliga.com/assets/useful/default-player/2048x2225/male_2_001.png';
    };
  const cardHeader = (
    <p>{player.name}, {player.age}</p>
  )

  const cardDescription = (
    <p>Predicted salary is ${player.predicted_salary}</p>
  )
  
  const cardMeta = (
    <p>{player.games_played} games played</p>
  )
  
  return (
    <Grid celled='internally' style={{width:'90%',marginLeft:'5%',marginRight:'5%',marginTop:'5%'}} onClose={props.handleClose} open={props.open}>
    <Grid.Row>
      <Grid.Column width={2}>
      <Card 
      image={player.player_img_link}
      header= {cardHeader}
      meta= {cardMeta}
      description= {cardDescription}
      />
      </Grid.Column>
      <Grid.Column width={3}>
        <Segment>
            <h2>Player Stats</h2>
            <p>Points: {player.points}</p>
            <p>Three Pointers: {player.three_pointers}</p>
            <p>Two Pointers: {player.two_pointers}</p>
            <p>Blocks: {player.blocks}</p>
            <p>Field Goals: {player.field_goals}</p>
            <p>Effected Feild Goal: {player.effected_field_goal*100} %</p>
        </Segment>
      </Grid.Column>
      <Grid.Column width={5}>
        <Segment>
        <Radar data={data} options={options} />
        </Segment>
      </Grid.Column>
    </Grid.Row>
  </Grid>
  );
  }

  export default PlayerStatsData;