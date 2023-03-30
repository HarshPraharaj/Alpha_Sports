import { useNavigate } from 'react-router-dom';
import { Card, Icon, Image, Button, Item, Label } from 'semantic-ui-react'

const Analytics = () => {

    const navigate = useNavigate();

    const loadRecommendations = () => {
        navigate('/recommendations');
    }
    const loadInjuryPrediction = () => {
        navigate('/injury');
    }
    const loadSalaryPrediction = () => {
        navigate('/salary');
    }

    return (
    <Card.Group style={{marginTop: '100px'}}>
        <Card style={{width: '40%', marginLeft: '100px'}}>
        <Card.Content>
            {/* <Image
            floated='left'
            size='mini'
            src='/images/avatar/large/steve.jpg'
            /> */}
            <Card.Header>Player Recommendations</Card.Header>
            {/* <Card.Meta>Friends of Elliot</Card.Meta> */}
            <Card.Description>
            Checkout similar players
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Button primary onClick={loadRecommendations} style={{marginLeft: '400px'}}>
                    Try it out
                    <Icon name='arrow right' />
            </Button>
        </Card.Content>
        </Card>
        <Card style={{width: '40%', marginLeft: '700px'}}>
        <Card.Content>
            {/* <Image
            floated='right'
            size='mini'
            src='/images/avatar/large/molly.png'
            /> */}
            <Card.Header>Salary Prediction</Card.Header>
            {/* <Card.Meta>New User</Card.Meta> */}
            <Card.Description>
            Predict a players salary
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            {/* <div className='ui two buttons'> */}
            <Button  primary onClick={loadSalaryPrediction} style={{marginLeft: '400px'}}>
                Try it out
                <Icon name='arrow right' />
            </Button>
            {/* <Button basic color='red'>
                Decline
            </Button> */}
            {/* </div> */}
        </Card.Content>
        </Card>
        <Card style={{width: '40%', marginLeft: '100px'}}>
        <Card.Content>
            {/* <Image
            floated='right'
            size='mini'
            src='/images/avatar/large/jenny.jpg'
            /> */}
            <Card.Header>Injury Prediction</Card.Header>
            {/* <Card.Meta>New User</Card.Meta> */}
            <Card.Description>
            Predict a player's potential Injury
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <Button primary onClick={loadInjuryPrediction} style={{marginLeft: '400px'}}>
                    Try it out
                    <Icon name='arrow right' />
            </Button>
        </Card.Content>
        </Card>
    </Card.Group>
        
    )
}

export default Analytics