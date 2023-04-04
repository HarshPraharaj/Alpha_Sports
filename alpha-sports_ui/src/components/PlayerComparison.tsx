import React from "react";
import { Button, Modal, Table } from "semantic-ui-react";
import { Radar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { RadialLinearScale } from "chart.js";

Chart.register(RadialLinearScale);

Object.keys(registerables).forEach((name: any) => {
  Chart.register(registerables[name]);
});

const data = {
  labels: ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5"],
  datasets: [
    {
      label: "Dataset 1",
      data: [65, 59, 90, 81, 56],
      fill: true,
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      pointBackgroundColor: "rgba(255, 99, 132, 1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(255, 99, 132, 1)",
    },
    {
      label: "Dataset 2",
      data: [28, 48, 40, 19, 96],
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

function PlayerComparison(props: { open: boolean, handleClose: () => void }) {
  return (
    <Modal onClose={props.handleClose} open={props.open}>
      <Modal.Header>Player Comparison</Modal.Header>
      <Modal.Content>
        <div className="container" style={{ backgroundColor: "white" }}>
          {/* First column */}
          <div className="column" style={{ color: "black" }}>
            <h2 style={{ color: "black" }}>Player 1 Details</h2>
            <p style={{ color: "black" }}>League name: </p>
            <p style={{ color: "black" }}>Club: </p>
            <p style={{ color: "black" }}>Player name: </p>
            <img
              src="https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-23/ratings/common/player-small-portraits/209658.png"
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
            <p style={{ color: "black" }}>League name: </p>
            <p style={{ color: "black" }}>Club: </p>
            <p style={{ color: "black" }}>Player name: </p>
            <img
              src="https://media.contentapi.ea.com/content/dam/ea/fifa/fifa-23/ratings/common/player-small-portraits/158023.png"
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
