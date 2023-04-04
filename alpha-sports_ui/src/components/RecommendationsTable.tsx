import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Table } from 'semantic-ui-react'
import PlayerComparison from './PlayerComparison'

const RecommendationsTable = (props: {recPlayers: any}) => {
    
    const [showComparison, setShowComparison] = React.useState(false);
    const onCompareClick = (player: any) => {
        console.log('Clicked on: ', {player})
        setShowComparison(true)
    }
    const handleCloseComparison = () => {
        setShowComparison(false);
    };

    const tableRows = props.recPlayers && props.recPlayers.map((player: any) => (
        <Table.Row>
            <Table.Cell>{player.name}</Table.Cell>
            <Table.Cell>{player.position}</Table.Cell>
            <Table.Cell>{player.age}</Table.Cell>
            <Table.Cell>{player.team}</Table.Cell>
            <Table.Cell>{player.league}</Table.Cell>
            <Table.Cell>{player.similarity}</Table.Cell>
            <Table.Cell><Button onClick={() => onCompareClick(player)}>Compare</Button></Table.Cell>
        </Table.Row>
    ))

    return (
        <div>
            <Table celled style={{marginTop: '5em'}}>
            <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Position</Table.HeaderCell>
                <Table.HeaderCell>Age</Table.HeaderCell>
                <Table.HeaderCell>Team</Table.HeaderCell>
                <Table.HeaderCell>League</Table.HeaderCell>
                <Table.HeaderCell>Similarity %</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
            </Table.Header>
            <Table.Body>
            {tableRows}
            </Table.Body>
        </Table>
        {showComparison && <PlayerComparison open={showComparison} handleClose={handleCloseComparison} />}
        </div>
    )
}

export default RecommendationsTable