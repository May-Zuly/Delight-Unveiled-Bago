import React from 'react';
import { Row, Col, Image, Typography, Button } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import './GroceriesSection.css';
import Grocery from "../../assets/images/grocery1.jpg";
const { Title, Paragraph, Text } = Typography;

const GroceriesSection = () => {
  return (
    <div className="organic-section">
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} md={12}>
          <Image
            src={Grocery}
            alt="Organic Farmer"
            preview={false}
            className="organic-image"
          />
        </Col>
        <Col xs={24} md={12}>
          <div className="organic-content">
            <Title level={1}>Best Local Artifacts And Groceries</Title>
            <Paragraph>
              Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet.
            </Paragraph>
            <ul className="organic-list">
              <li>
                <CheckCircleOutlined className="icon" />
                <Text>Tempor erat elitr rebum at clita</Text>
              </li>
              <li>
                <CheckCircleOutlined className="icon" />
                <Text>Aliqu diam amet diam et eos</Text>
              </li>
              <li>
                <CheckCircleOutlined className="icon" />
                <Text>Clita duo justo magna dolore erat amet</Text>
              </li>
            </ul>
            <Button type="primary" shape="round" size="large">Read More</Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default GroceriesSection;
