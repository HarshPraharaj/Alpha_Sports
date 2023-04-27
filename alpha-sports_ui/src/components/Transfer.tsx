import { useEffect, useState } from 'react';
import { Button, Container, Dropdown, Header, Image } from 'semantic-ui-react';
import { getPlayersApiV2, predictValueApi } from '../api/PlayerRecApi';
import './PlayerRecommendation.css';

const Transfer = () => {
  const [players, setPlayers] = useState<any[]>([]);
  const [prediction, setPrediction] = useState(null);
  const [predictButtonEnabled, setPredictButtonEnabled] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [heatmapUrl, setHeatmapUrl] = useState('');
  const [shotsUrl, setShotsUrl] = useState('');

  const getPrediction = async () => {
    const response: any = await predictValueApi(selectedPlayer);
    console.log(response.data.heatmap)
    setPrediction(response.data.prediction);
    setHeatmapUrl("../../public/images/"+response.data.heatmap.split('/')[4]);
    setShotsUrl("../../public/images/"+response.data.shots.split('/')[4]);
  };

  const enableButton = (event: any, data: any) => {
    if (data.value) {
      setSelectedPlayer(data.value);
      setPredictButtonEnabled(true);
    } else {
      setPredictButtonEnabled(false);
    }
  };

  const fetchData = async () => {
    const response = await getPlayersApiV2();
    const formattedPlayers = response.data.map((player: any, index: number) => {
      return {
        key: index,
        text: player,
        value: player,
      };
    });
    setPlayers(formattedPlayers);
  };  
  

  useEffect(() => {
    console.log("*******************")
    fetchData();
  }, []);

  return (
    <Container style={{ width: '90%' }}>
      <div className="player-recommendation-content">
        <Header
          as="h2"
          content="Player Prediction"
          inverted
          style={{
            fontSize: '3.7em',
            fontWeight: 'bold',
            marginTop: '0.5em',
            marginBottom: '0.5em',
          }}
        />
        <Dropdown
          search
          clearable
          placeholder="Select player"
          fluid
          selection
          onChange={enableButton}
          options={players}
          scrolling
        />
        <Button
          disabled={!predictButtonEnabled}
          onClick={getPrediction}
          size="small"
          style={{
            height: '3em',
            width: '13.7em',
            backgroundColor: '#000000',
            color: '#ffffff',
          }}
        >
          Get Prediction
        </Button>
        {
          prediction && (
            <div>
              Prediction: {prediction}
            </div>
          )
        }
        {
          heatmapUrl && (
            <div>
              <h3>Heatmap</h3>
              <Image src={heatmapUrl} alt="Heatmap" />
            </div>
          )
        }
        {
          shotsUrl && (
            <div>
              <h3>Shots</h3>
              <Image src={shotsUrl} alt="Shots" />
            </div>
          )
        }
      </div>
    </Container>
  );
};

export default Transfer;