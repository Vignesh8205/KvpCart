import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
// import ExampleCarouselImage from 'components/ExampleCarouselImage';

function ControlledCarousel(props) {
  const [index, setIndex] = useState(0);

 

  return (
    <Carousel >
      <Carousel.Item interval={2000}>
        {/* <ExampleCarouselImage text="First slide" /> */}
        <img src={props.image} alt="" className='carouselimg' />
       
      </Carousel.Item>
      <Carousel.Item interval={2500}>
        {/* <ExampleCarouselImage text="Second slide" /> */}
        <img src={props.image} alt="" className='carouselimg' />

      </Carousel.Item>
      <Carousel.Item interval={2500}>
        {/* <ExampleCarouselImage text="Third slide" /> */}
        <img src={props.image} alt="" className='carouselimg' />
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;