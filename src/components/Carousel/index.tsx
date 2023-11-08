"use client";
import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const MyCarousel = () => {
  return (
    <Carousel 
      showStatus={false}
      showThumbs={false}
      infiniteLoop={true}
      stopOnHover={false}
      autoPlay={true}
      interval={5000}
    >
      <div>
        <img src="/images/slider/slider-1.png" alt="Image 1" />
        <p className="legend">Caption 1</p>
      </div>
      <div>
        <img src="/images/slider/slider-1.png" alt="Image 2" />
        <p className="legend">Caption 2</p>
      </div>
      <div>
        <img src="/images/slider/slider-1.png" alt="Image 3" />
        <p className="legend">Caption 3</p>
      </div>
      <div>
        <img src="/images/slider/slider-1.png" alt="Image 4" />
        <p className="legend">Caption 4</p>
      </div>
    </Carousel>
  );
};

export default MyCarousel;