import { useEffect, useState } from 'react'
import { Button, Container, Dropdown, Grid, Header } from 'semantic-ui-react'
import { getPlayersApi, getRecommendationsApi } from '../api/PlayerRecApi'
import RecommendationsTable from './RecommendationsTable'


const PlayerRecommendation = () => {
    const [players, setPlayers] = useState([])
    const [showTable, setShowTable] = useState(false)
    const [recommendations, setRecommendations] = useState([])
    const [recButtonEnabled, setRecButtonEnabled] = useState(false)
    const [playerFilters, setPlayerFilters] = useState({id: -1, team: "", league: ""})

    const getRecommendations = async () => {
        const response: any = await getRecommendationsApi(playerFilters)
        setRecommendations(response.data)
        setShowTable(true)
    }

    const enableButton = (event: any, data: any) => {
        // console.log('enable button called', data.value)
        console.log('enable button called', data)
        if (data.value) {
            setPlayerFilters({id: data.value, team: "", league: ""})
            setRecButtonEnabled(true)
        }
        else {
            setShowTable(false)
            setRecButtonEnabled(false)
        }
    }

    const fetchData = async () => {
        const response = await getPlayersApi()
        console.log('Response is', response)
        setPlayers(response.data)
    }
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <Container style={{ width: '800px' }}>
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
        <Grid divided>
            <Grid.Row>
                <Grid.Column width={5}>
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
                <Grid.Column width={3}>
                    <Dropdown
                    clearable
                    search
                    placeholder='Max age'
                    fluid
                    selection
                    options={[{text:'18', value: 18}, {text:'19', value: 19}, {text:'20', value: 20}, {text:'21', value: 21}, {text:'22', value: 22}, {text:'23', value: 23}, {text:'24', value: 24}, {text:'25', value: 25}]}
                />
                </Grid.Column>
                <Grid.Column width={4}>
                    <Dropdown
                    clearable
                    search
                    placeholder='League'
                    fluid
                    selection
                    options={[{text:'Premier League', value: 'EPL'}, {text:'Ligue 1', value: 'Ligue1'}, {text:'La Liga', value: 'LaLiga'}, {text:'Bundesliga', value: 'Bundesliga'}, {text:'Serie A', value: 'SerieA'}]}
                />
                </Grid.Column>
                <Grid.Column width={4}>
                    <Button disabled={!recButtonEnabled} onClick={getRecommendations} size='small' style = {{height: '3em', width: '13.7em'}}>
                        Get Recommendations
                    </Button>
                </Grid.Column>
            </Grid.Row>
        </Grid>
            {showTable && recommendations && <RecommendationsTable queryPlayerId={playerFilters.id}   recPlayers={recommendations}/>}
        </Container>
    )
}

export default PlayerRecommendation