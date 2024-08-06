import React from "react";
import { Row, Col, Image, Typography, Button } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import "./GroceriesSection.css";
import Grocery from "../../assets/images/grocery6.jpg";
const { Title, Paragraph, Text } = Typography;

const GroceriesSection = () => {
  return (
    <div className="organic-section" id="home">
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} md={24} lg={12}>
          <div className="img-box">
            <Image
              src={Grocery}
              alt="Organic Farmer"
              preview={false}
              className="organic-image"
            />
          </div>
          {/* <div className="img-box">
          </div> */}
        </Col>
        <Col xs={24} md={24} lg={12}>
          <div className="organic-content">
            <Title level={2} className="content-title">
              Best Local Artifacts And Groceries
            </Title>
            <Paragraph className="content-description">
              Explore the finest offerings of the Bago region, where rich
              cultural heritage meets exquisite local produce. Here are some of
              the best artifacts and groceries that showcase the unique charm
              and tradition of Bago.
            </Paragraph>
            <ul className="organic-list">
              <li>
                <CheckCircleOutlined className="icon" />
                <Text className="list-text">
                  Handcrafted with meticulous detail with traditional designs
                  and patterns
                </Text>
              </li>
              <li>
                <CheckCircleOutlined className="icon" />
                <Text className="list-text">
                  Made from bronze, wood, or marble
                </Text>
              </li>
              <li>
                <CheckCircleOutlined className="icon" />
                <Text className="list-text">
                  Showcases traditional weaving techniques and local materials
                  including vibrant longyi and shawls
                </Text>
              </li>
              <li>
                <CheckCircleOutlined className="icon" />
                <Text className="list-text">
                  A key ingredient in many local dishes known for its tangy and
                  refreshing flavor
                </Text>
              </li>
              <li>
                <CheckCircleOutlined className="icon" />
                <Text className="list-text">
                  Grown in the fertile fields of Bago
                </Text>
              </li>
              <li>
                <CheckCircleOutlined className="icon" />
                <Text className="list-text">
                  Adds a distinct and authentic taste to regional cuisine
                  including turmeric, chili, and lemongrass
                </Text>
              </li>
            </ul>
            {/* <Button type="primary" shape="round" size="large">Read More</Button> */}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default GroceriesSection;
