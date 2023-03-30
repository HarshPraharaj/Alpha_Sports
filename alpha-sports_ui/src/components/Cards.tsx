import { Card, Icon, Image, Button } from 'semantic-ui-react'

import { useNavigate } from 'react-router-dom'

const assets = require('../assets/assets.js')

const Cards = (props: {title: string, image: string, route: string}) => {
    const navigate = useNavigate();

    const loadAnalytics = () => {
        navigate(props.route);
    }

    return (
        <Card style={{marginTop: '2.5em', background: 'silver'}}>
            <Image src={assets[props.image]} wrapped ui={true} />
            <Card.Content>
            <Card.Header>{props.title}</Card.Header>
            {/* <Card.Meta>Joined in 2016</Card.Meta> */}
            <Card.Description>
                Lorem ipsum something something
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
            <a>
                <Button onClick={loadAnalytics} primary size='large'>
                    Try it out
                    <Icon name='arrow right' />
                </Button>
            </a>
            </Card.Content>
        </Card>
    )
}

export default Cards