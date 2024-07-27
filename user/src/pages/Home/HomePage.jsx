import CarouselSection from "../../components/Carousel/CarouselSection";
import GroceriesSection from "../../components/Groceries/GroceriesSection";
import FeatureSection from "../../components/Features/Feature";
import ProductSection from "../../components/Product/ProductSection";
import AboutUsSection from "../../components/AboutUs/AboutUsSection";
import ContactUsSection from "../../components/ContactUs/ContactUsSection";
const HomePage = () => {
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
