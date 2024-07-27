import React from "react";
import { Row, Col, Card, Typography } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import "./FeatureDetail.css";

const { Title, Text } = Typography;

// const featureDetails = [
//   {
//     img: "/src/assets/images/grocery1.jpg",
//     title: "Cultural Heritage Artifacts",
//     keyPoints: [
//       "Handcrafted with traditional designs",
//       "Made from bronze, wood, or marble",
//       "Reflects rich cultural heritage",
//     ],
//   },
//   {
//     img: "/src/assets/images/grocery1.jpg",
//     title: "Authentic Local Groceries",
//     keyPoints: [
//       "Fresh and locally sourced",
//       "Supports local farmers",
//       "Rich in nutrients and flavor",
//     ],
//   },
//   {
//     img: "/src/assets/images/grocery1.jpg",
//     title: "Artisan Craftsmanship",
//     keyPoints: [
//       "Skilled artisan techniques",
//       "Unique and high-quality products",
//       "Culturally significant items",
//     ],
//   },
// ];

const FeatureDetail = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);
  useEffect(() => {
    const selected = JSON.parse(localStorage.getItem("selectedFeature"));
    console.log(selected);
    setSelectedFeature(selected);
  }, []);

  return (
    <>
      {selectedFeature && (
        <div className="feature-detail-section">
          <Title level={1} className="feature-detail-title">
            Feature Details
          </Title>
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Card className="feature-detail-card">
                <Row gutter={[16, 16]} align="middle">
                  <Col xs={24} md={12}>
                    <img
                      src={selectedFeature.img}
                      alt={selectedFeature.title}
                      className="feature-detail-img"
                    />
                  </Col>
                  <Col xs={24} md={12}>
                    <Title level={3} className="detail-title">
                      {selectedFeature.title}
                    </Title>
                    <ul className="key-points-list">
                      {selectedFeature.keyPoints.map((point, idx) => (
                        <li key={idx}>
                          <CheckCircleOutlined className="icon" />
                          <Text className="key-point">{point}</Text>
                        </li>
                      ))}
                    </ul>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default FeatureDetail;
