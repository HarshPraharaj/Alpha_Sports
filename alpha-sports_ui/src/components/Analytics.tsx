import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Icon, Button, Accordion, Grid } from 'semantic-ui-react'

const Analytics = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(-1);

  const loadRecommendations = () => {
    navigate('/recommendations');
  };
  const loadInjuryPrediction = () => {
    navigate('/injury');
  };
  const loadSalaryPrediction = () => {
    navigate('/salary');
  };

  const handleClick = (e: React.MouseEvent, index: number) => {
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };


  return (
    <Grid style={{ marginTop: '100px' }}>
        <Grid.Column>
      <Card style={{ width: '40%', marginLeft: '100px' }}>
        <Card.Content>
          <Card.Header>Player Recommendations</Card.Header>
          <Card.Description>
            Checkout similar players
            <Accordion>
            <Accordion.Title onClick={(e) => handleClick(e, 0)}>
                <Icon name="dropdown" />
                See more
                </Accordion.Title>
              <Accordion.Content active={activeIndex === 0}>
                <p>
                  Get ahead of the competition by using our state of the art recommendation system. 
                  By analyzing data on player performance and other factors such as playing style, we can provide recommendations on which players to recruit.
                </p>
              </Accordion.Content>
            </Accordion>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button
            primary
            onClick={loadRecommendations}
            style={{ marginLeft: '400px' }}
          >
            Try it out
            <Icon name="arrow right" />
          </Button>
        </Card.Content>
      </Card>

      <Card style={{ width: '40%', marginLeft: '100px' }}>
        <Card.Content>
          <Card.Header>Salary Prediction</Card.Header>
          <Card.Description>
            Predict a player's salary (Coming soon)
            <Accordion>
            <Accordion.Title onClick={(e) => handleClick(e, 1)}>
                <Icon name="dropdown" />
                See more
                </Accordion.Title>
              <Accordion.Content active={activeIndex === 1}>
                <p>
                  This feature will be available in the next release.
                </p>
              </Accordion.Content>
            </Accordion>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button
            disabled
            primary
            onClick={loadSalaryPrediction}
            style={{ marginLeft: '400px' }}
          >
            Try it out
            <Icon name="arrow right" />
          </Button>
        </Card.Content>
      </Card>

      <Card style={{ width: '40%', marginLeft: '100px' }}>
        <Card.Content>
          <Card.Header>Injury Prediction</Card.Header>
          <Card.Description>
            Predict a player's potential injury. (Coming soon)
            <Accordion>
            <Accordion.Title onClick={(e) => handleClick(e, 2)}>
            <Icon name="dropdown" />
            See more
            </Accordion.Title>
              <Accordion.Content active={activeIndex === 2}>
                <p>
                  This feature will be available in the next release.
                </p>
              </Accordion.Content>
            </Accordion>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button
            disabled
            primary
            onClick={loadInjuryPrediction}
            style={{ marginLeft: '400px' }}
          >
            Try it out
            <Icon name="arrow right" />
          </Button>
        </Card.Content>
      </Card>
      </Grid.Column>
    </Grid>
  );
};

export default Analytics;