import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import testImage1 from "../images/testImage1.jpg";
import testImage2 from "../images/testImage2.jpg";
import testImage3 from "../images/testImage3.jpg";

const TopCrousel = () => {
  return (
    <div className="w-full mt-20 px-20">
      <Carousel
        centerMode
        autoPlay
        // dynamicHeight={false}
        infiniteLoop
        interval={1000}
        renderThumbs={() => null}
      >
        <img
          className="h-[360px] w-full object-center"
          src={testImage1}
          alt=""
          loading="lazy"
        />
        <img
          className="h-[360px] w-full object-center"
          src={testImage2}
          alt=""
          loading="lazy"
        />
        <img
          className="h-[360px] w-full object-center"
          src={testImage3}
          alt=""
          loading="lazy"
        />
      </Carousel>
    </div>
  );
};

export default TopCrousel;
