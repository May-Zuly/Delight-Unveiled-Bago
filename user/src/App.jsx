import "./App.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import AboutUsPage from "./pages/AboutUs/AboutUsPage";
import BlogPage from "./pages/Blog/BlogPag";
import BlogProfile from "./pages/Blog/BlogProfile";
import CartPage from "./pages/Cart";
import CheckoutPage from "./pages/CheckoutPage";
import ContactUsPage from "./pages/ContactUsPage";
import DefaultLayout from "./Layout/defaultLayout";
import FeatureDetail from "./components/Features/FeatureDetail";
import HomePage from "./pages/Home/HomePage";
import LoginFormApp from "./pages/Login/LoginForm";
import LogoutPage from "./pages/Logout/LogoutPage";
import ProductPage from "./pages/Product/ProductPage";
import Register from "./pages/Register/RegisterPage";

const App = () => {
  return (
    <Router>
      <DefaultLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogProfile />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/login" element={<LoginFormApp />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/feature-detail" element={<FeatureDetail />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/about-us-page" element={<AboutUsPage />} />
        </Routes>
      </DefaultLayout>
    </Router>
  );
};

export default App;
