import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import { BrowserRouter as Router } from "react-router-dom";
//import 'antd/dist/antd.css';
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Router>
    <App />
  </Router>
);
