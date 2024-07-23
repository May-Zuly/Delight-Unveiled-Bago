import React from 'react';
import { Row, Col, Typography, Button } from 'antd';
import './AboutUsSection.css';

const { Title, Paragraph } = Typography;

const AboutUsSection = () => {
  return (
    <div className="about_section layout_padding long_section" id='about-us'>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={12}>
            <div className="img-box">
              <img src="/src/assets/images/about-img.png" alt="About Us" className="about-us-image" />
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="detail-box">
              <div className="heading_container">
                <Title level={2}>About Us</Title>
              </div>
              <Paragraph className="about-us-paragraph">
                Welcome to Delight Unveiled Bago! We are dedicated to providing you with the best experience possible. Our mission is to bring joy and delight to our customers through our exceptional products and services.
              </Paragraph>
              <ul className="about-us-list">
                <li><span className="icon">✔</span>High quality products</li>
                <li><span className="icon">✔</span>Exceptional customer service</li>
                <li><span className="icon">✔</span>Innovative solutions</li>
              </ul>
              <Button type="primary" href="">
                Read More
              </Button>
            </div>
          </Col>
        </Row>
    </div>
  );
};

export default AboutUsSection;
