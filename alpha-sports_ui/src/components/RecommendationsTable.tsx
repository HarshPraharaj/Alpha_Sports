import React from 'react'
import { Button, Icon, Menu, Table } from 'semantic-ui-react'

const RecommendationsTable = (props: {recPlayers: any}) => {

    const onCompareClick = (player: any) => {
        console.log('Clicked on: ', {player})
    }

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
            {/* <Table.Footer>
            <Table.Row>
                <Table.HeaderCell colSpan='3'>
                <Menu floated='right' pagination>
                    <Menu.Item as='a' icon>
                    <Icon name='chevron left' />
                    </Menu.Item>
                    <Menu.Item as='a'>1</Menu.Item>
                    <Menu.Item as='a'>2</Menu.Item>
                    <Menu.Item as='a'>3</Menu.Item>
                    <Menu.Item as='a'>4</Menu.Item>
                    <Menu.Item as='a' icon>
                    <Icon name='chevron right' />
                    </Menu.Item>
                </Menu>
                </Table.HeaderCell>
            </Table.Row>
            </Table.Footer> */}
        </Table>
    )
}

export default RecommendationsTable