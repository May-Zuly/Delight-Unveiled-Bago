import React from 'react';
import { Row, Col, Card, Typography } from 'antd';
import { 
  AppstoreOutlined,
  InfoCircleOutlined,
  SearchOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  SolutionOutlined 
} from '@ant-design/icons';
import './FeatureSection.css'; // Import the CSS file

const { Title, Paragraph } = Typography;

const features = [
  {
    icon: <AppstoreOutlined className="feature-icon"/>,
    title: "Product Listings and Filters",
    description: "Comprehensive product listings with categories for groceries and artifacts. Advanced filtering options to sort by price, category, popularity, and new arrivals.",
  },
  {
    icon: <InfoCircleOutlined className="feature-icon"/>,
    title: "Detailed Product Information",
    description: "Detailed product pages with high-quality images, descriptions, prices, and user reviews. Information on product origin and production methods.",
  },
  {
    icon: <SearchOutlined className="feature-icon"/>,
    title: "Search Functionality",
    description: "Robust search feature allowing users to quickly find products by name, category, or keywords. Autocomplete suggestions to enhance user experience.",
  },
  {
    icon: <UserOutlined className="feature-icon"/>,
    title: "User Authentication and Profiles",
    description: "Secure user registration and login. User profiles to manage personal information, order history, and preferences.",
  },
  {
    icon: <ShoppingCartOutlined className="feature-icon"/>,
    title: "Shopping Cart and Checkout",
    description: "Intuitive shopping cart for users to add, view, and modify their selected products. Secure and streamlined checkout process with multiple payment options.",
  },
  {
    icon: <SolutionOutlined className="feature-icon"/>,
    title: "Producer Portal",
    description: "Dedicated portal for producers to list and manage their products. Tools for tracking sales, inventory, and export options.",
  },
];

const Features = () => (
  <div className="features-container">
    <Title level={2} className="features-title">
      Features of Delight Unveiled: Groceries and Artifacts of Bago Region
    </Title>
    <Row gutter={[16, 16]}>
      {features.map((feature, index) => (
        <Col key={index} xs={24} sm={12} lg={8}>
          <Card hoverable className="feature-card">
            <div className="feature-icon-container">{feature.icon}</div>
            <Title level={4} style={{fontFamily:'"Lato", sans-serif'}}>{feature.title}</Title>
            <Paragraph className="feature-description">{feature.description}</Paragraph>
          </Card>
        </Col>
      ))}
    </Row>
  </div>
);

export default Features;
