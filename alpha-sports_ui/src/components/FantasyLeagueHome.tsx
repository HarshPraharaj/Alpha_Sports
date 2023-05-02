import { useEffect, useState } from "react";
import {  Card, Container, Grid, Header, Image, Table, Tab, TabProps } from "semantic-ui-react";
import { getCWFixturesAPI } from "../api/PlayerRecApi";
import banner from "../images/banner.jpeg"

const FantasyLeagueHome = () => {
    const [resposeData, setResponseData] = useState({'current':[],'previous':[]});
    const [showPrevious, setShowPrevious] = useState(false);
    const [fixtures,setFixtures] = useState([]);
    const [activeTab, setActiveTab] = useState(1);
    
    const getFixtures = async () => {
      const response: any = await getCWFixturesAPI();
      setResponseData(response.data);
      setFixtures(response.data['current']);
    };
  
    useEffect(() => {
      getFixtures();
      setShowPrevious(false);
      setActiveTab(1);
      setFixtures(resposeData['current']);
    }, []);
    
    const handleTabChange = (event: React.MouseEvent<HTMLDivElement>, data: TabProps) => {
        if (data.activeIndex == 0) {
            setActiveTab(0)
            setShowPrevious(true)
            setFixtures(resposeData['previous'])
        } else {
            setActiveTab(1)
            setShowPrevious(false)
            setFixtures(resposeData['current'])
        }
        
    }

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
            {showPrevious && 
                <Table.Cell>
                <Header as='h5' style={{marginLeft:'25%'}}>
                    <Header.Content style={{color:'white'}}>
                        {fixture.team_h_score} - {fixture.team_a_score}
                    </Header.Content>
                </Header> 
            </Table.Cell>}
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

    const tableContent = (
        <div style={{height:'435px',overflow:'scroll'}}>
        <Table inverted>
                        <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>
                                <h4 style={{marginLeft:'30%'}}>
                                Home Team
                                </h4>
                            </Table.HeaderCell>
                            {showPrevious && 
                            <Table.HeaderCell>
                            
                        </Table.HeaderCell>}
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
    )

    const panes = [
        {
            
            menuItem:'Previous Week',
            render: () => <Tab.Pane>
                {tableContent}
            </Tab.Pane>
        },
        {
            menuItem:'Current Week',
            render: () => <Tab.Pane>
                {tableContent}
            </Tab.Pane>
        }
    ]
  
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
                    <Tab inverted panes={panes} activeIndex={activeTab} onTabChange={handleTabChange}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
          </Container>
      </Container>
    );
  };
  
  export default FantasyLeagueHome;