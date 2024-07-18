import React from 'react';
import { Row, Col, Card, Button, Typography } from 'antd';
import './Feature.css';

const { Title, Paragraph } = Typography;

const features = [
  {
    img: '/src/assets/images/grocery1.jpg',
    title: 'Natural Process',
    description: 'Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed vero dolor duo.',
    // delay: '0.1s'
  },
  {
    img: '/src/assets/images/grocery1.jpg',
    title: 'Organic Products',
    description: 'Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed vero dolor duo.',
    // delay: '0.3s'
  },
  {
    img: '/src/assets/images/grocery1.jpg',
    title: 'Biologically Safe',
    description: 'Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed vero dolor duo.',
    // delay: '0.5s'
  }
];

const FeatureSection = () => {
  return (
    <div className="feature-section" id='feature'>
      <div className="mainfeature">
        <div className="section-header">
          <Title level={1} className="feature-title">Our Features</Title>
          <Paragraph>Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed rebum vero dolor duo.</Paragraph>
        </div>
        <Row gutter={[16, 16]}>
          {features.map((feature, index) => (
            <Col xs={24} md={12} lg={8} key={index}>
              <Card className="feature-card">
                <img src={feature.img} alt={feature.title} className="feature-img" />
                <Title level={4} className="img-title">{feature.title}</Title>
                <Paragraph className="img-description">{feature.description}</Paragraph>
                <Button type="primary" shape="round" className="feature-button">Read More</Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default FeatureSection;
