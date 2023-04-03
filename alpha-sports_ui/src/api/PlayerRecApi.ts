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
    const endpoint = 'http://127.0.0.1:5000/recommend/' + filters.id
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