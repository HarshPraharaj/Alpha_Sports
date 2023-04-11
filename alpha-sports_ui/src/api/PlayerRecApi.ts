import axios from 'axios'

const defaultPlayers = [
    {
        key: 1,
        text: 'Lionel Messi',
        value: 'Lionel Messi',
    },
    {
        key: 2,
        text: 'Cristiano Ronaldo',
        value: 'Cristiano Ronaldo',
    },
    {
        key: 3,
        text: 'M. Salah',
        value: 'M. Salah',
    },
    {
        key: 4,
        text: 'Luis Suarez',
        value: 'Luis Suarez',
    },
    {
        key: 5,
        text: 'Van Dijk',
        value: 'Van Dijk',
    },
    {
        key: 6,
        text: 'Leandro Trossard',
        value: 'Leandro Trossard',
    },
]

const defaultRecommendations = [
    {
        id:  1,
        name:  'Jay Spearing',
        position: 'MDF',
        age:  24,
        team:  'Liverpool FC',
        league: 'English Premier League',
        similarity: '78%'
    },
    {
        id:  1,
        name:  'Jay Spearing',
        position: 'MDF',
        age:  24,
        team:  'Liverpool FC',
        league: 'English Premier League',
        similarity: '78%'
    },
    {
        id:  1,
        name:  'Jay Spearing',
        position: 'MDF',
        age:  24,
        team:  'Liverpool FC',
        league: 'English Premier League',
        similarity: '78%'
    },
    {
        id:  1,
        name:  'Jay Spearing',
        position: 'MDF',
        age:  24,
        team:  'Liverpool FC',
        league: 'English Premier League',
        similarity: '78%'
    },
    {
        id:  1,
        name:  'Jay Spearing',
        position: 'MDF',
        age:  24,
        team:  'Liverpool FC',
        league: 'English Premier League',
        similarity: '78%'
    },
    {
        id:  1,
        name:  'Jay Spearing',
        position: 'MDF',
        age:  24,
        team:  'Liverpool FC',
        league: 'English Premier League',
        similarity: '78%'
    },
    {
        id:  1,
        name:  'Jay Spearing',
        position: 'MDF',
        age:  24,
        team:  'Liverpool FC',
        league: 'English Premier League',
        similarity: '78%'
    },
    {
        id:  1,
        name:  'Jay Spearing',
        position: 'MDF',
        age:  24,
        team:  'Liverpool FC',
        league: 'English Premier League',
        similarity: '78%'
    },
    {
        id:  1,
        name:  'Jay Spearing',
        position: 'MDF',
        age:  24,
        team:  'Liverpool FC',
        league: 'English Premier League',
        similarity: '78%'
    },
    {
        id:  1,
        name:  'Jay Spearing',
        position: 'MDF',
        age:  24,
        team:  'Liverpool FC',
        league: 'English Premier League',
        similarity: '78%'
    },
    {
        id:  1,
        name:  'Jay Spearing',
        position: 'MDF',
        age:  24,
        team:  'Liverpool FC',
        league: 'English Premier League',
        similarity: '78%'
    },
    {
        id:  1,
        name:  'Jay Spearing',
        position: 'MDF',
        age:  24,
        team:  'Liverpool FC',
        league: 'English Premier League',
        similarity: '78%'
    },
    {
        id:  1,
        name:  'Jay Spearing',
        position: 'MDF',
        age:  24,
        team:  'Liverpool FC',
        league: 'English Premier League',
        similarity: '78%'
    },
    {
        id:  1,
        name:  'Jay Spearing',
        position: 'MDF',
        age:  24,
        team:  'Liverpool FC',
        league: 'English Premier League',
        similarity: '78%'
    },
    {
        id:  1,
        name:  'Jay Spearing',
        position: 'MDF',
        age:  24,
        team:  'Liverpool FC',
        league: 'English Premier League',
        similarity: '78%'
    }
]

const defaultComparisons = [
    {
        id:  209658,
        name:  'Mario Gotze',
        club: "Bayer Munich",
        league: "Bundesliga",
        press: 65,
        pass_completion: 59,
        shots_on_target: 90,
        pass_completion_final_third: 81,
        aerial_duels_won: 56,
        ball_carries_final_third: 85,
        ball_recovery: 65
    },
    {
        id: 158023,
        name:  'Lionel Messi',
        club: "PSG",
        league: "Ligue 1",
        press: 60,
        pass_completion: 69,
        shots_on_target: 81,
        pass_completion_final_third: 92,
        aerial_duels_won: 45,
        ball_carries_final_third: 51,
        ball_recovery: 45
    }
]

export const getPlayersApi = () => { 
    return axios.get('http://127.0.0.1:5000/player-names')
        .then(response => {
            console.log(response)
            return response
        })
        .catch(error => {
            console.log('Error fetching players', error)
            return {data: defaultPlayers}
        })
}

export const getRecommendationsApi = (filters: {id: number, team: string, league: string}) => {
    const endpoint = 'http://127.0.0.1:5000/recommend?player_id=' + filters.id
    return axios.get(endpoint)
        .then(response => {
            console.log(response)
            return response
        })
        .catch(error => {
            console.log('Error fetching recommendations', error)
            return {data: defaultRecommendations}
        })
}

export const getComparisonApi = (player_id1: number, player_id2: number) => {
    console.log("Compari API",player_id1, player_id2)
    const endpoint = 'http://127.0.0.1:5000/compare?player_id1=' + player_id1 + '&player_id2=' + player_id2
    return axios.get(endpoint)
        .then(response => {
            console.log(response)
            return response
        })
        .catch(error => {
            console.log('Error fetching recommendations', error)
            return {data: defaultComparisons}
        })
}