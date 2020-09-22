import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const ImageSlider = props => {
  return (
    <Carousel dynamicHeight={true} showThumbs={false} showIndicators={false}>
      {props.imgList.map(ele => (
        <div>
          <img
            style={{
              maxHeight: "350px",
              maxWidth: "440px",
              minWidth: "320px",
              minHeight: "250px"
            }}
            src={ele.imgURL}
            alt="Restaurant Images"
          />
        </div>
      ))}
    </Carousel>
  );
};

export default ImageSlider;
