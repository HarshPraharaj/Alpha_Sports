import { Container, Header, Grid } from 'semantic-ui-react'
import Cards from './Cards'

const fantasyText = "Looking for an edge in your fantasy league? Look no further than our fantasy player recommender!"
const analyticsText = "Try out our analytics feature and gain a winning advantage with our state-of-the art AI techniques!"

// const Home = () => (
//     <AwesomeSlider cssModule={AwesomeSliderStyles}>
//         <div data-src="/path/to/image-0.png" />
//         <div data-src="/path/to/image-1.png" />
//         <div data-src="/path/to/image-2.jpg" />
//     </AwesomeSlider>
// )

const Home = () => (
    <Container text>
        <Header as='h1'
                content=''
                inverted
                style={{
                    fontSize: '4em',
                    fontWeight: 'bold',
                    marginTop: '1em',
                    marginBottom: '1.5em'
                }}
        />
        {/* <Segment> */}
        <Grid divided='vertically' style={{marginLeft: "0.6em"}}>
            <Grid.Row columns={2}>
                <Grid.Column>
                    <Cards title='Analytics' image='analyticsIcon' route='/analytics' disabled={false} text={analyticsText}/>
                </Grid.Column>
                <Grid.Column>
                    <Cards title='Fantasy League' image='serviceIcon' route='/services' disabled={false} text={fantasyText}/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
        {/* </Segment> */}
    </Container>
)

export default Home