import React from "react";
import { Carousel, Button } from "antd";
import slider1 from "../../assets/images/artifactslider.jpg";
import slider2 from "../../assets/images/bambooslider.jpg";
import slider3 from "../../assets/images/foodslider.jpg";
// Import other images as needed
import "./CarouselSection.css";

const CarouselSection = () => {
  return (
    <Carousel autoplay>
      <div className="carousel-slide">
        <img src={slider1} alt="Organic Food" className="carousel-image" />
        <div className="carousel-content">
          <h1>Handmade Artistry</h1>
          <div>
            <p>Explore the exceptional craftsmanship of Bago's artisans, where tradition meets creativity in every unique piece</p>
          </div>
        </div>
      </div>
      <div className="carousel-slide">
        <img src={slider2} alt="Organic Food" className="carousel-image" />
        <div className="carousel-content">
          <h1>Rich Cultural Artifacts</h1>
          <div>
            <p>Discover the timeless treasures of Bago, from intricately crafted sculptures to ancient relics that tell the story of our heritage</p>
          </div>
        </div>
      </div>
      <div className="carousel-slide">
        <img src={slider3} alt="Organic Food" className="carousel-image" />
        <div className="carousel-content">
          <h1>Exquisite Local Groceries</h1>
          <div>
            <p>Savor the authentic flavors of Bago with our selection of fresh, locally-sourced groceries, bringing the essence of our region to your kitchen</p>
          </div>
        </div>
      </div>
      {/* Add more slides if needed */}
    </Carousel>
  );
};

export default CarouselSection;
