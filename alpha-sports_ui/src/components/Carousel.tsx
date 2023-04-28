import Slider from "react-slick"
import Home from './Home'
import "./slick.css"
import "./slick-theme.css"
import AnalyticsHome from "./analytics-home/AnalyticsHome"
import { Container, Header, Grid, Image, Button } from 'semantic-ui-react'
import fantasyImage from "../images/fantasy_league.png"
import debounce from 'lodash.debounce'

const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <div className="slick-prev"></div>, // custom previous arrow
    nextArrow: <div className="slick-next"></div>,
    draggable: true,
    swipe: true,
    // autoplay: true,
    // autoplaySpeed: 2000
    // appendDots: (dots: any) => (
    //     <div>
    //       <div style={{ position: "relative" }}>
    //         <Image src={dots.props.children.props.src} />
    //         {dots}
    //       </div>
    //     </div>
    //   ),
    //   customPaging: (i: any) => <Button className="slider-dot">{i + 1}</Button>
}

const onWheelSlider = debounce((e:  any, ref: any) => {
    if (!ref.current) return;
    if (e.deltaX > 0) {
      ref.current.slickNext();
    } else if (e.deltaX < 0) {
      ref.current.slickPrev();
    }
  }, 20);

const Carousel = () => (
    // <div onWheel={onWheelSlider}>
        <Slider {...settings}>
            <div>
                <Home/>
            </div>
            <div>
                <AnalyticsHome/>
            </div>
        </Slider>
    // </div>
)

export default Carousel