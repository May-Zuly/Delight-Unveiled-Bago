import "./App.css";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import ContactUsPage from "./pages/ContactUsPage";
import DefaultLayout from "./Layout/defaultLayout";
import HomePage from "./pages/Home/HomePage";
import ProductPage from "./pages/Product/ProductPage";
import LoginFormApp from "./pages/Login/LoginForm";
import Register from "./pages/Register/RegisterPage";
import LogoutPage from "./pages/Logout/LogoutPage";
import BlogPage from "./pages/Blog/BlogPag";
import FeatureDetail from "./components/Features/FeatureDetail";
import AboutUsPage from "./pages/AboutUs/AboutUsPage";
const App = () => {
  return (
    <Router>
      <DefaultLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/blog" element={<BlogPage/>}/>
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/login" element={<LoginFormApp />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/feature-detail" element={<FeatureDetail/>}/>
          <Route path="/about-us-page" element={<AboutUsPage/>}/>
        </Routes>
      </DefaultLayout>
    </Router>
  );
};

export default App;
