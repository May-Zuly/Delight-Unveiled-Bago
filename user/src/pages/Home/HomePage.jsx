import { useEffect } from "react";
import CarouselSection from "../../components/Carousel/CarouselSection";
import GroceriesSection from "../../components/Groceries/GroceriesSection";
import api from "../../api/helper";
import FeatureSection from "../../components/Features/Feature";
import ProductSection from "../../components/Product/ProductSection";
import AboutUsSection from "../../components/AboutUs/AboutUsSection";
const HomePage = () => {
  /**
   * Fetch Products (public API)
   */
  const fetchProducts = async () => {
    const res = await api.get("products", {
      headers: { requireToken: false },
    });
    console.log("products ------> ", res.data);
  };

  /**
   * Fetch Ratings (private API)
   */
  const fetchRatings = async () => {
    try {
      const res = await api.get("ratings", {
        headers: { requireToken: true },
      });
      console.log("ratings ------> ", res.data);
    } catch (error) {
      alert("You are not login");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchRatings();
  }, []);

  return (
    <>
      <CarouselSection />
      <GroceriesSection />
      <FeatureSection/>
      <AboutUsSection/>
      <ProductSection/>
    </>
  );
};

export default HomePage;
