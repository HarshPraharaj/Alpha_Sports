import { Container, Header, Grid } from 'semantic-ui-react'
import Cards from './Cards'

const Home = () => (
    <Container text>
        <Header as='h1'
                content='Alpha-Sports'
                inverted
                style={{
                    fontSize: '4em',
                    fontWeight: 'bold',
                    marginTop: '0.5em',
                }}
        />
        <Grid divided='vertically' style={{marginLeft: "0.6em"}}>
            <Grid.Row columns={2}>
                <Grid.Column>
                    <Cards title='Analytics' image='analyticsIcon' route='/analytics'/>
                </Grid.Column>
                <Grid.Column>
                    <Cards title='Services' image='serviceIcon' route='/services'/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Container>
)

export default Home