import React from "react";
import { Carousel, Button } from "antd";
import slider1 from "../../assets/images/slider1.jpg";
import slider2 from "../../assets/images/slider2.jpg";
// Import other images as needed
import "./CarouselSection.css";

const CarouselSection = () => {
  return (
    <Carousel autoplay>
      <div className="carousel-slide">
        <img src={slider1} alt="Organic Food" className="carousel-image" />
        <div className="carousel-content">
          <h1>Organic Food Is Good For Health</h1>
          <div className="buttons">
            <Button className="green-button">Products</Button>
            <Button className="orange-button">Services</Button>
          </div>
        </div>
      </div>
      <div className="carousel-slide">
        <img src={slider2} alt="Organic Food" className="carousel-image" />
        <div className="carousel-content">
          <h1>Organic Food Is Good For Health</h1>
          <div className="buttons">
            <Button className="green-button">Products</Button>
            <Button className="orange-button">Services</Button>
          </div>
        </div>
      </div>
      {/* Add more slides if needed */}
    </Carousel>
  );
};

export default CarouselSection;
