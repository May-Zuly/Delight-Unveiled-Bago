import React from 'react';
import { Layout } from 'antd';
import './Footer.css';

const { Footer } = Layout;

const AppFooter = () => (
  <Footer className="footer">
    <div className="footer-content">
      <p>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
      <p>Contact: info@myapp.com</p>
    </div>
  </Footer>
);

export default AppFooter;
