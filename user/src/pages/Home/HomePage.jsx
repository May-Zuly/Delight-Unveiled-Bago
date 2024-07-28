import { useEffect } from "react";
import CarouselSection from "../../components/Carousel/CarouselSection";
import GroceriesSection from "../../components/Groceries/GroceriesSection";
import FeatureSection from "../../components/Features/Feature";
import ProductSection from "../../components/Product/ProductSection";
import AboutUsSection from "../../components/AboutUs/AboutUsSection";
import ContactUsSection from "../../components/ContactUs/ContactUsSection";
const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <CarouselSection />
      <GroceriesSection />
      <FeatureSection />
      <AboutUsSection />
      <ProductSection />
      <ContactUsSection />
    </>
  );
};

export default HomePage;
