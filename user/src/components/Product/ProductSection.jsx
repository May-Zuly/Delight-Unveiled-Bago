import React, { useState } from 'react';
import { Tabs, Button, Row, Col, Card, Tag } from 'antd';
import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css'; // Optional: reset Ant Design styles to remove any conflicts
import './ProductSection.css';

const { TabPane } = Tabs;

const products = [
  { id: 1, name: 'Wooden Table', price: 19, oldPrice: 29, image: '/src/assets/images/f6.png' },
  { id: 2, name: 'Wooden Table', price: 19, oldPrice: 29, image: '/src/assets/images/f6.png' },
  { id: 3, name: 'Wooden Table', price: 19, oldPrice: 29, image: '/src/assets/images/f6.png' },
  { id: 4, name: 'Wooden Table', price: 19, oldPrice: 29, image: '/src/assets/images/f6.png' },
  { id: 5, name: 'Wooden Table', price: 19, oldPrice: 29, image: '/src/assets/images/f6.png' },
  { id: 6, name: 'Wooden Table', price: 19, oldPrice: 29, image: '/src/assets/images/f6.png' },
  { id: 7, name: 'Wooden Table', price: 19, oldPrice: 29, image: '/src/assets/images/f6.png' },
  { id: 8, name: 'Wooden Table', price: 19, oldPrice: 29, image: '/src/assets/images/f6.png' }
];

const ProductSection = () => {
  const [activeTab, setActiveTab] = useState('1');

  return (
    <div className="product-section" id='product'>
      <div className="product-container">
        <Row gutter={[16, 16]} align="bottom">
          <Col lg={12}>
            <div className="section-header">
              <h1>Our Products</h1>
              <p>Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed rebum vero dolor duo.</p>
            </div>
          </Col>
          <Col lg={12}>
            <div className="tabs-container">
              <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key)}>
                <TabPane tab="Groceries" key="1" />
                <TabPane tab="Artifacts" key="2" />
              </Tabs>
            </div>
          </Col>
        </Row>

        <div className="tab-content">
          <div className="tab-pane fade show p-0 active">
            <Row gutter={[16, 16]}>
              {products.map((product, index) => (
                <Col xl={6} lg={8} md={12} key={product.id}>
                  <Card
                    hoverable
                    cover={<img alt={product.name} src={product.image} />}
                  >
                    <Tag color="magenta" className="position-absolute">New</Tag>
                    <Card.Meta title={product.name} className="text-title" />
                    <div className="price mt-2">
                      <span className="text-primary me-1">${product.price}.00</span>
                      <span className="text-body">${product.oldPrice}.00</span>
                    </div>
                    <div className="actions mt-3" style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Button type="link" icon={<EyeOutlined />}>View detail</Button>
                      <Button type="link" icon={<ShoppingCartOutlined />}>Add to cart</Button>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
            <div className="text-center mt-4">
              <Button type="primary" shape="round" size="large">Browse More Products</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
