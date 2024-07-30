import { useEffect, useState } from "react";
import { Tabs, Button, Row, Col, Card, Tag } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { cart } from "../../store";
import { useRecoilState } from "recoil";

import api from "../../api/helper";
import "antd/dist/reset.css"; // Optional: reset Ant Design styles to remove any conflicts
import "./ProductSection.css";

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
  const [cartData, setCartData] = useRecoilState(cart);
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

  const addProductToCart = (product) => {
    setCartData((prevCartData) => {
      let cartList = prevCartData.map((item) => ({ ...item }));
      const productIndex = cartList.findIndex((d) => d.id === product.id);

      if (productIndex > -1) {
        cartList[productIndex] = {
          ...cartList[productIndex],
          quantity: cartList[productIndex].quantity + 1,
        };
      } else {
        const newProduct = { ...product, quantity: 1 };
        cartList.push(newProduct);
      }

      return cartList;
    });
  };

  const getQuantity = (id) => {
    const data = cartData.find((d) => d.id === id);
    return data?.quantity || "";
  };

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
                          <Button
                            type="link"
                            icon={
                              <div className="cartButton">
                                {getQuantity(product.id) ? (
                                  <div
                                    style={{
                                      width: "30px",
                                      height: "30px",
                                      borderRadius: "50%",
                                      background: "rgb(170, 98, 15)",
                                      color: "white",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      marginLeft: "8px",
                                    }}
                                  >
                                    {getQuantity(product.id)}
                                  </div>
                                ) : (
                                  <Button
                                    style={{ border: "none" }}
                                    icon={<ShoppingCartOutlined />}
                                  />
                                )}
                              </div>
                            }
                            onClick={() => addProductToCart(product)}
                          >
                            Add to Cart
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
