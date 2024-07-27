import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Button, Typography } from "antd";
import "./Feature.css";

const { Title, Paragraph } = Typography;

const features = [
  {
    img: "/src/assets/images/grocery1.jpg",
    title: "Cultural Heritage Artifacts",
    description:
      "Discover the timeless treasures of Bago, from intricately crafted sculptures to ancient relics that tell the story of our heritage",
    // delay: '0.1s'
    keyPoints: [
      "Handcrafted with traditional designs",
      "Made from bronze, wood, or marble",
      "Reflects rich cultural heritage",
    ],
  },
  {
    img: "/src/assets/images/grocery1.jpg",
    title: "Authentic Local Groceries",
    description:
      "Savor the authentic flavors of Bago with our selection of fresh, locally-sourced groceries, bringing the essence of our region to your kitchen.",
    // delay: '0.3s'
    keyPoints: [
      "Fresh and locally sourced",
      "Supports local farmers",
      "Rich in nutrients and flavor",
    ],
  },
  {
    img: "/src/assets/images/grocery1.jpg",
    title: "Artisan Craftsmanship",
    description:
      "Explore the exceptional craftsmanship of Bago's artisans, where tradition meets creativity together in beautifully handcrafted textiles and sculptures.",
    // delay: '0.5s'
    keyPoints: [
      "Skilled artisan techniques",
      "Unique and high-quality products",
      "Culturally significant items",
    ],
  },
];

const FeatureSection = () => {
  const navigate = useNavigate();
  
  const handleReadMore = (index) => {
    const selectedFeature = features[index];
    localStorage.setItem('selectedFeature', JSON.stringify(selectedFeature));
    navigate("/feature-detail");
  };
  return (
    <div className="feature-section" id="feature">
      <div className="mainfeature">
        <div className="section-header">
          <Title level={1} className="feature-title">
            Our Features
          </Title>
          <Paragraph>
            Discover the unique offerings of the Bago region through our
            carefully curated features, authentic local produce, and exceptional
            artisan craftsmanship that define this remarkable area.
          </Paragraph>
        </div>
        <Row gutter={[16, 16]}>
          {features.map((feature, index) => (
            <Col xs={24} md={12} lg={8} key={index}>
              <Card className="feature-card">
                <img
                  src={feature.img}
                  alt={feature.title}
                  className="feature-img"
                />
                <Title level={4} className="img-title">
                  {feature.title}
                </Title>
                <Paragraph className="img-description">
                  {feature.description}
                </Paragraph>
                <Button type="primary"
                  shape="round"
                  className="feature-button"
                  onClick={() => handleReadMore(index)}>
                  Read More
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default FeatureSection;
