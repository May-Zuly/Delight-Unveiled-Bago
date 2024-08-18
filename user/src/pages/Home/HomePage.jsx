import { useEffect } from "react";
import CarouselSection from "../../components/Carousel/CarouselSection";
import GroceriesSection from "../../components/Groceries/GroceriesSection";
import Features from "../../components/Features/FeatureSection";
import ProductSection from "../../components/Product/ProductSection";
import AboutUsSection from "../../components/AboutUs/AboutUsSection";
import ContactUsSection from "../../components/ContactUs/ContactUsSection";
import BagoMap from "../../components/BagoMap/BagoMap";
const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <CarouselSection />
      <GroceriesSection />
      {/* <FeatureSection /> */}
      <Features />
      <AboutUsSection />
      <ProductSection />
      <ContactUsSection />
      <BagoMap/>
    </>
  );
};

export default HomePage;
