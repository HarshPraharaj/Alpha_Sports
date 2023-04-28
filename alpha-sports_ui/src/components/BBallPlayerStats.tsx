import { useEffect, useState } from 'react'
import { Button, Container, Dropdown, Grid, Header } from 'semantic-ui-react'
import { getBBallPlayersApi, getBBallPlayerStatsApi, getPlayersApi} from '../api/PlayerRecApi'
import './PlayerRecommendation.css';
import PlayerStatsData from './BBallStatsTable';

const BBallPlayerStats = () => {
    const [players, setPlayers] = useState([])
    const [showTable, setShowTable] = useState(false)
    const [recButtonEnabled, setRecButtonEnabled] = useState(false)
    const [playerName, setPlayerName] = useState('')
    const [playerStats, setPlayerStats] = useState({})
    const [showStats, setShowStats] = useState(false)

    const getPlayerStats = async () => {
        const response: any = await getBBallPlayerStatsApi(playerName)
        setPlayerStats(response.data)
        setShowTable(true)
    }

    const handleCloseStats = () => {
        setShowStats(false);
    };

    const enableButton = (event: any, data: any) => {
        // console.log('enable button called', data.value)
        console.log('enable button called', data)
        if (data.value) {
            setPlayerName(data.value)
            setRecButtonEnabled(true)
        }
        else {
            setShowTable(false)
            setRecButtonEnabled(false)
        }
    }

    const fetchData = async () => {
        const response = await getBBallPlayersApi()
        console.log('Response is', response)
        setPlayers(response.data)
    }
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <Container style={{ width: '90%' }}>
        <div className="player-recommendation-content">
            <Header as='h2'
                content='Player Recommendation'
                inverted
                style={{
                    fontSize: '3.7em',
                    fontWeight: 'bold',
                    marginTop: '0.5em',
                    marginBottom: '0.5em'
                }}
        />
        <Grid columns={2} divided style={{marginLeft:'25%',marginRight:'25%',width:'50%'}}>
            <Grid.Row>
                <Grid.Column style={{width:'50%'}}>
                <Dropdown
                    search
                    clearable
                    placeholder='Select player'
                    fluid
                    selection
                    onChange={enableButton}
                    options={players}
                    scrolling
                />
                </Grid.Column>
                <Grid.Column style={{width:'100%'}}>
                <Button disabled={!recButtonEnabled} onClick={getPlayerStats} size='small' style = {{
                    height: '3em',
                    width: '60%',
                    backgroundColor: '#000000', // Theme color
                    color: '#ffffff' // Theme text color
                    }}>
                    Predict Salary
                    </Button>
                </Grid.Column>
            </Grid.Row>
        </Grid>
            {showTable && playerStats && <PlayerStatsData data={playerStats} open={showStats} handleClose={handleCloseStats}/>}
            </div>
        </Container>
    )
}

export default BBallPlayerStats
