import React from "react";
import Navbar from "./Navbar";
import HomePage from "./HomePage";
import AppFooter from "./Footer";
import "../App.css";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <HomePage />
      <AppFooter />
    </div>
  );
};

export default App;
