import { useEffect, useState } from "react";
import { Tabs, Button, Row, Col, Card, Tag } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import api from "../../api/helper";
import "antd/dist/reset.css"; // Optional: reset Ant Design styles to remove any conflicts
import "./ProductSection.css";

const { TabPane } = Tabs;

const fetchProducts = async () => {
  try {
    const res = await api.get("products", {
      headers: { requireToken: false },
      params: {
        populate: {
          image: true,
        },
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error : ", error);
    return null;
  }
};

const ProductSection = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      let products = await fetchProducts();
      products.data = products.data.slice(0, 8);
      setProducts(products.data ? products.data : null);
    };
    getProducts();
  }, []);

  return (
    <div className="product-section" id="product">
      <div className="product-container">
        <Row gutter={[16, 16]} align="bottom">
          <Col lg={12}>
            <div className="section-header">
              <h1>Our Products</h1>
              <p>
                Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum
                diam justo sed rebum vero dolor duo.
              </p>
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
              {products !== null && (
                <>
                  {products.map((product) => (
                    <Col xl={6} lg={8} md={12} key={product.id}>
                      <Card
                        hoverable
                        cover={
                          <img
                            alt={product.attributes.name}
                            src={
                              `http://localhost:1337` +
                              product.attributes.image.data.attributes.url
                            }
                          />
                        }
                      >
                        <Tag color="magenta" className="position-absolute">
                          New
                        </Tag>
                        <Card.Meta
                          title={product.attributes.name}
                          className="text-title"
                        />
                        <div className="price mt-2">
                          <span className="text-primary me-1">
                            ${product.attributes.price}.00
                          </span>
                        </div>
                        <div
                          className="actions mt-3"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Button type="link" icon={<EyeOutlined />}>
                            View detail
                          </Button>
                          <Button type="link" icon={<ShoppingCartOutlined />}>
                            Add to cart
                          </Button>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </>
              )}
            </Row>
            <div className="text-center mt-4">
              <Button type="primary" shape="round" size="large">
                Browse More Products
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
