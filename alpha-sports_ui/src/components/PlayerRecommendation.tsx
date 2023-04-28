import { useEffect, useState } from "react";
import { Button, Container, Dropdown, Grid, Header } from "semantic-ui-react";
import { getPlayersApi, getRecommendationsApi } from "../api/PlayerRecApi";
import banner from "../images/player_rec_car3.jpeg";
import "./PlayerRecommendation.css";
import RecommendationsTable from "./RecommendationsTable";

const PlayerRecommendation = () => {
  const [players, setPlayers] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [recButtonEnabled, setRecButtonEnabled] = useState(false);
  const [playerFilters, setPlayerFilters] = useState({
    id: -1,
    team: "",
    league: "",
  });

  const getRecommendations = async () => {
    const response: any = await getRecommendationsApi(playerFilters);
    setRecommendations(response.data);
    setShowTable(true);
  };

  const enableButton = (event: any, data: any) => {
    // console.log('enable button called', data.value)
    console.log("enable button called", data);
    if (data.value) {
      setPlayerFilters({ id: data.value, team: "", league: "" });
      setRecButtonEnabled(true);
    } else {
      setShowTable(false);
      setRecButtonEnabled(false);
    }
  };

  const fetchData = async () => {
    const response = await getPlayersApi();
    console.log("Response is", response);
    setPlayers(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true, // Enable auto-changing slides
    autoplaySpeed: 3000,
  };

  return (
    <Container style={{ width: "100%" }}>
      <div className="banner">
          <img src={banner} alt="Player Recommendation Banner" />
        </div>
        <div className="service-description">
          <p>
            Discover your team's next star with our advanced Player Recommendation Service. Utilizing cutting-edge data analytics and performance metrics, we identify the most promising players tailored to your team's specific needs. Enhance your scouting process and gain a competitive edge with our powerful player insights and recommendations.
          </p>
        </div>
        <Container style={{ width: "800px" }}>
        <div className="player-recommendation-content">
        <Header
          as="h2"
          content="Player Recommendation"
          inverted
          style={{
            fontSize: "3.7em",
            fontWeight: "bold",
            marginTop: "0.5em",
            marginBottom: "0.5em",
          }}
        />
        <Grid divided>
          <Grid.Row>
            <Grid.Column width={5}>
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
            </Grid.Column>
            <Grid.Column width={3}>
              <Dropdown
                disabled
                clearable
                search
                placeholder="Max age"
                fluid
                selection
                options={[
                  { text: "18", value: 18 },
                  { text: "19", value: 19 },
                  { text: "20", value: 20 },
                  { text: "21", value: 21 },
                  { text: "22", value: 22 },
                  { text: "23", value: 23 },
                  { text: "24", value: 24 },
                  { text: "25", value: 25 },
                ]}
              />
            </Grid.Column>
            <Grid.Column width={4}>
              <Dropdown
                disabled
                clearable
                search
                placeholder="League"
                fluid
                selection
                options={[
                  { text: "Premier League", value: "EPL" },
                  { text: "Ligue 1", value: "Ligue1" },
                  { text: "La Liga", value: "LaLiga" },
                  { text: "Bundesliga", value: "Bundesliga" },
                  { text: "Serie A", value: "SerieA" },
                ]}
              />
            </Grid.Column>
            <Grid.Column width={4}>
              <Button
                disabled={!recButtonEnabled}
                onClick={getRecommendations}
                size="small"
                style={{
                  height: "3em",
                  width: "13.7em",
                  backgroundColor: "#000000", // Theme color
                  color: "#ffffff", // Theme text color
                }}
              >
                Get Recommendations
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {showTable && recommendations && (
          <RecommendationsTable
            queryPlayerId={playerFilters.id}
            recPlayers={recommendations}
          />
        )}
      </div>
      </Container>
    </Container>
  );
};

export default PlayerRecommendation;