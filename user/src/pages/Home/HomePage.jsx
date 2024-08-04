import CarouselSection from "../../components/Carousel/CarouselSection";
import GroceriesSection from "../../components/Groceries/GroceriesSection";
import Features from "../../components/Features/FeatureSection";
import ProductSection from "../../components/Product/ProductSection";
import AboutUsSection from "../../components/AboutUs/AboutUsSection";
import ContactUsSection from "../../components/ContactUs/ContactUsSection";
const HomePage = () => {
  return (
    <>
      <CarouselSection />
      <GroceriesSection />
      {/* <FeatureSection /> */}
      <Features/>
      <AboutUsSection />
      <ProductSection />
      <ContactUsSection />
    </>
  );
};

export default HomePage;
