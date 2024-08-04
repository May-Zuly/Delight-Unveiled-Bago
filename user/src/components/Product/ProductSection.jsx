import { useEffect, useState } from "react";
import { Tabs, Button, Row, Col, Card, Tag ,Typography } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import api from "../../api/helper";
import "antd/dist/reset.css"; // Optional: reset Ant Design styles to remove any conflicts
import "./ProductSection.css";


const { Title, Paragraph} = Typography;
const { TabPane } = Tabs;

const fetchProducts = async () => {
  try {
    const query = qs.stringify(
      {
        // sorting
        sort: ["createdAt:desc"],
        // Get data from relation
        populate: {
          image: true,
        },
        // pagination
        pagination: {
          page: 1,
          pageSize: 8,
        },
      },
      {
        encodeValuesOnly: true, // prettify URL
      }
    );
    const res = await api.get(`products?${query}`, {
      headers: { requireToken: false },
    });
    return res.data;
  } catch (error) {
    console.error("Error : ", error);
    return null;
  }
};

const ProductSection = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("1");
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      let products = await fetchProducts();
      setProducts(products.data ? products.data : null);
    };
    getProducts();
  }, []);

  return (
    <div className="product-section" id="product">
      <div className="product-container">
        <Row gutter={[16, 16]} align="bottom">
          <Col lg={24}>
            <div className="section-header">
              <Title level={2} className="product-title">Our Products</Title>
              <Paragraph className="product-description">
              Discover an exquisite selection of groceries and artifacts from the Bago Region, meticulously curated to bring the best of our heritage and quality to your doorstep!
              </Paragraph>
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
                            className="card-img"
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
                            Ks {product.attributes.price}
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
              <Button
                type="primary"
                shape="round"
                size="large"
                onClick={() => navigate("/products")}
                style={{
                    backgroundColor: '#995f20',
                    borderColor: '#aa620f',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#dda15e';
                    e.currentTarget.style.borderColor = '#995f20';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#995f20';
                    e.currentTarget.style.borderColor = '#aa620f';
                }}
              >
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
