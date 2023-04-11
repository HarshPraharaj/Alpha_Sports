import { Modal, Table } from "semantic-ui-react";
import { Radar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { RadialLinearScale } from "chart.js";

Chart.register(RadialLinearScale);

Object.keys(registerables).forEach((name: any) => {
  Chart.register(registerables[name]);
});

function PlayerComparison(props: { data: any, open: boolean, handleClose: () => void }) {
  const [player1, player2] = props.data;

  const data = {
    labels: [
      "Press",
      "Pass Completion",
      "Shots on Target",
      "Pass Completion Final Third",
      "Aerial Duels Won",
      "Ball Carries Final Third",
      "Ball Recovery",
    ],
    datasets: [
      {
        label: player1.name,
        data: [
          player1.press,
          player1.pass_completion,
          player1.shots_on_target,
          player1.pass_completion_final_third,
          player1.aerial_duels_won,
          player1.ball_carries_final_third,
          player1.ball_recovery,
        ],
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(255, 99, 132, 1)",
      },
      {
        label: player2.name,
        data: [
          player2.press,
          player2.pass_completion,
          player2.shots_on_target,
          player2.pass_completion_final_third,
          player2.aerial_duels_won,
          player2.ball_carries_final_third,
          player2.ball_recovery,
        ],
        fill: true,
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        pointBackgroundColor: "rgba(54, 162, 235, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(54, 162, 235, 1)",
      },
    ],
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

  return (
    <Modal onClose={props.handleClose} open={props.open}>
      <Modal.Header>Player Comparison</Modal.Header>
      <Modal.Content>
        <div className="container" style={{ backgroundColor: "white" }}>
          {/* First column */}
          <div className="column" style={{ color: "black" }}>
            <h2 style={{ color: "black" }}>Player 1 Details</h2>
            <p style={{ color: "black" }}>League name: {player1.league}</p>
            <p style={{ color: "black" }}>Club:{player1.club} </p>
            <p style={{ color: "black" }}>Player name:{player1.name} </p>
            <img
              src={`https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-23/ratings/common/player-small-portraits/${player1.id}.png`}
              alt="Player 1 portrait"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>

          {/* Second column */}
          <div className="column" style={{ width: "50%" }}>
            <div>
              <Radar data={data} options={options} />
            </div>
            <Table celled style={{ marginTop: "1em", color: "black" }}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell></Table.HeaderCell>
                  <Table.HeaderCell>Player 1</Table.HeaderCell>
                  <Table.HeaderCell>Player 2</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>Stat 1</Table.Cell>
                  <Table.Cell>Value 1</Table.Cell>
                  <Table.Cell>Value 2</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Stat 2</Table.Cell>
                  <Table.Cell>Value 1</Table.Cell>
                  <Table.Cell>Value 2</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Stat 3</Table.Cell>
                  <Table.Cell>Value 1</Table.Cell>
                  <Table.Cell>Value 2</Table.Cell>
                </Table.Row>
                {/* Add more rows for additional stats */}
              </Table.Body>
            </Table>
          </div>

          {/* Third column */}
          <div className="column" style={{ color: "black" }}>
            <h2 style={{ color: "black" }}>Player 2 Details</h2>
            <p style={{ color: "black" }}>League name: {player2.league}</p>
            <p style={{ color: "black" }}>Club: {player2.club}</p>
            <p style={{ color: "black" }}>Player name: {player2.name}</p>
            <img
              src={`https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-23/ratings/common/player-small-portraits/${player2.id}.png`}
              alt="Player 2 portrait"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
}

export default PlayerComparison;
