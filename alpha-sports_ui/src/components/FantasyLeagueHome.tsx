import { useEffect, useState } from "react";
import {  Card, Container, Grid, Header, Image, Table } from "semantic-ui-react";
import { getCWFixturesAPI } from "../api/PlayerRecApi";
import banner from "../images/banner.jpeg"

const FantasyLeagueHome = () => {
    const [fixtures, setFixtures] = useState([]);
    
  
    const getFixtures = async () => {
      const response: any = await getCWFixturesAPI();
      setFixtures(response.data);
      
    };
  
    useEffect(() => {
      getFixtures();
    }, []);

    const tableRows = fixtures.map((fixture: any) => (
        <Table.Row>
            <Table.Cell>
                <Header as='h4' image style={{marginLeft:'25%'}}>
                    <Image src={'https://resources.premierleague.com/premierleague/badges/t'+fixture.team_h_code+'.svg'} style={{width:'40px',height:'40px'}}/>
                    <Header.Content style={{color:'white'}}>
                        {fixture.team_h_name}
                    </Header.Content>
                </Header>    
            </Table.Cell>
            <Table.Cell>
                <Header as='h4' image style={{marginLeft:'25%'}}>
                    <Image src={'https://resources.premierleague.com/premierleague/badges/t'+fixture.team_a_code+'.svg'} style={{width:'40px',height:'40px'}}/>
                    <Header.Content style={{color:'white'}}>
                        {fixture.team_a_name}
                    </Header.Content>
                </Header>    
            </Table.Cell>
        </Table.Row>
    ))
  
    return (
      <Container style={{ width: "100%",marginTop:'10%' }}>
          <Container style={{ width: "100%" }}>
            <Grid divided='vertically' style={{width:'100%'}}>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <Card style={{width:'90%', marginLeft:'10%'}}
                        image= {banner}
                        header = 'Choose the best team for your fantasy game this week'
                        description ='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                        />   
                    </Grid.Column>
                    <Grid.Column>
                    <div style={{height:'500px',overflow:'scroll'}}>
                    <Table celled inverted>
                        <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>
                                <h4 style={{marginLeft:'30%'}}>
                                Home Team
                                </h4>
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                                <h4 style={{marginLeft:'30%'}}>
                                Away Team
                                </h4>
                            </Table.HeaderCell>
                        </Table.Row>
                        </Table.Header>
                        <Table.Body>
                        {tableRows}
                        </Table.Body>
                    </Table>
                    </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
          </Container>
      </Container>
    );
  };
  
  export default FantasyLeagueHome;