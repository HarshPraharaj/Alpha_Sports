import axios from 'axios'

const API_BASE_URL = "http://127.0.0.1:5000"
// process.env.REACT_APP_API_BASE_URL || 'https://20230423t201359-dot-msds-603.uc.r.appspot.com';

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
        name:  'Paulo Dybala',
        position: 'FWD',
        age:  24,
        team:  'AS Roma',
        league: 'Serie A',
        similarity: '98.46%'
    },
    {
        id:  1,
        name:  'Jack Grealish',
        position: 'MDF',
        age:  24,
        team:  'Manchester City FC',
        league: 'English Premier League',
        similarity: '96.45%'
    },
    {
        id:  1,
        name:  'Neymar',
        position: 'FWD',
        age:  24,
        team:  'Paris',
        league: 'Ligue 1',
        similarity: '92.55%'
    },
    {
        id:  1,
        name:  'Nabil Fekir',
        position: 'MDF',
        age:  24,
        team:  'Real Betis',
        league: 'La Liga',
        similarity: '89.33%'
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
        name:  'Leon Goretzka',
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

const defaultBBallPlayers = [
    {
        key: 'Giannis Antetokounmpo',
        text: 'Giannis Antetokounmpo',
        value: 'Giannis Antetokounmpo',
    },
    {
        key: 'Kevin Durant',
        text: 'Kevin Durant',
        value: 'Kevin Durant',
    },
    {
        key: 'Stephen Curry',
        text: 'Stephen Curry',
        value: 'Stephen Curry',
    },
    {
        key: 'Nikola Jokic',
        text: 'Nikola Jokic',
        value: 'Nikola Jokic',
    },
    {
        key: 'Joel Embiid',
        text: 'Joel Embiid',
        value: 'Joel Embiid',
    },
    {
        key: 'LeBron James',
        text: 'LeBron James',
        value: 'LeBron James',
    },
]

const defaultPlayerStats = {
    name:'',
    age:25,
    games_played:50,
    field_goals:50,
    three_pointers:10,
    two_pointers:10,
    effected_field_goal:0.5,
    points:150,
    blocks:5,
    player_img_link:'https://kamarfifa.pl/wp-content/uploads/2020/12/no-face.jpg',
    predicted_salary:10000000
}


export const getPlayersApi = () => { 
    return axios.get(`${API_BASE_URL}/player-names`, {timeout: 2000})
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
    const endpoint = `${API_BASE_URL}/recommend?player_id=${filters.id}`
    return axios.get(endpoint, {timeout: 2000})
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
    const endpoint = `${API_BASE_URL}/compare?player_id1=${player_id1}&player_id2=${player_id2}`
    return axios.get(endpoint, {timeout: 2000})
        .then(response => {
            console.log(response)
            return response
        })
        .catch(error => {
            console.log('Error fetching recommendations', error)
            return {data: defaultComparisons}
        })
}

export const getBBallPlayersApi = () => { 
    return axios.get(`${API_BASE_URL}/bball-players`)
        .then(response => {
            console.log(response)
            return response
        })
        .catch(error => {
            console.log('Error fetching players', error)
            return {data: defaultBBallPlayers}
        })
}

export const getBBallPlayerStatsApi = (player_name: string) => {
    console.log("Fetch stats",player_name)
    const endpoint = `${API_BASE_URL}/bball-player-stats?player_name=${player_name}`
    return axios.get(endpoint)
        .then(response => {
            console.log(response)
            return response
        })
        .catch(error => {
            console.log('Error fetching player stats', error)
            return {data: defaultPlayerStats}
        })
}