import React from "react";
import Navbar from "../components/Navbar/Navbar";
import CarouselSection from "../components/Carousel/CarouselSection";
import GroceriesSection from "../components/Groceries/GroceriesSection";
import AppFooter from "../components/Footer/Footer";

const HomePage = () => {
  return (
    <div className="home-page">
      <Navbar />
      <CarouselSection />
      <GroceriesSection />
      <AppFooter />
    </div>
  );
};

export default HomePage;
