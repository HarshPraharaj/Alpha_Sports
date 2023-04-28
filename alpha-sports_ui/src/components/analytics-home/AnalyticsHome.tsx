import { Container, Header, Grid, Image, Button } from 'semantic-ui-react'
import fantasyImage from "../../images/fantasy_league.png"

import "./styles.css"
const fantasyText = "Looking for an edge in your fantasy league? Look no further than our fantasy player recommender!"
const analyticsText = "Try out our analytics feature and gain a winning advantage with our state-of-the art AI techniques!"

const assets = require('../../assets/assets.js')

const AnalyticsHome = () => (
    <div>
        <Image src={assets["analyticsIcon"]} style={{ height: '100vh', width: '100vw', objectFit: 'cover' }}/>
            <Button style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '1'
          }}>Click me</Button>
    </div>
)

export default AnalyticsHome