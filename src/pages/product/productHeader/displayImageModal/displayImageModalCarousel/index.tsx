import React from 'react';
import styled from 'styled-components';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';

interface IIndicatorProps {
  inactive: boolean;
}

interface IDisplayImageModalCarouselProps {
  productImages: string[];
  slide: number;
  setSlide: (slide: number) => void;
}

const Carousel = styled.div`
  position: relative;
`;

const CarouselImagesContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 60rem;
  height: 60rem;
`;

const Slide = styled.img`
  border-radius: 0.5rem;
  box-shadow: 0 0 0.7rem #666;
  object-fit: cover;
  display: ${(props) => (props.hidden ? 'none' : 'static')};
`;

const StyledBsArrowLeftCircleFill = styled(BsArrowLeftCircleFill)`
  position: absolute;
  filter: drop-shadow(0px 0px 5px #555);
  width: 2rem;
  height: 2rem;
  color: white;
  left: 1rem;
  top: 48.5%;
  &:hover {
    cursor: pointer;
  }
`;

const StyledBsArrowRightCircleFill = styled(BsArrowRightCircleFill)`
  position: absolute;
  filter: drop-shadow(0px 0px 5px #555);
  width: 2rem;
  height: 2rem;
  color: white;
  right: 1rem;
  top: 48.5%;
  &:hover {
    cursor: pointer;
  }
`;

const Indicators = styled.span`
  display: flex;
  position: absolute;
  bottom: 1rem;
  left: 47%;
`;

const Indicator = styled.button<IIndicatorProps>`
  background-color: ${(props) => (props.inactive ? 'grey' : 'white')};
  height: 0.5rem;
  width: 0.5rem;
  border-radius: 100%;
  border: none;
  outline: none;
  box-shadow: 0px 0px 5px #555;
  margin: 0 0.2rem;
  cursor: pointer;
`;

const DisplayImageModalCarousel: React.FC<IDisplayImageModalCarouselProps> = ({
  productImages,
  slide,
  setSlide,
}) => {
  const nextSlide = () => {
    setSlide(slide === productImages.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? productImages.length - 1 : slide - 1);
  };

  return (
    <Carousel>
      <CarouselImagesContainer>
        <StyledBsArrowLeftCircleFill onClick={prevSlide} />
        {productImages.map((image, idx) => {
          return (
            <Slide
              src={image}
              alt="product image"
              key={idx}
              hidden={slide === idx ? false : true}
            />
          );
        })}
        <StyledBsArrowRightCircleFill onClick={nextSlide} />
      </CarouselImagesContainer>
      <Indicators>
        {productImages.map((_, idx) => {
          return (
            <Indicator
              key={idx}
              inactive={slide !== idx}
              onClick={() => setSlide(idx)}
            ></Indicator>
          );
        })}
      </Indicators>
    </Carousel>
  );
};

export default DisplayImageModalCarousel;
