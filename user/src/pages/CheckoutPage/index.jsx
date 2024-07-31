import { Card, Form, Input, Button, Row, Col, List, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { cart } from "../../store";
import "./CheckoutPage.css";
import { Radio } from "antd";
import { useState } from "react";
import api from "../../api/helper";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(1);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const [cartData, setCartData] = useRecoilState(cart);

  const onFinish = (values) => {
    console.log("Payment Details: ", values);
    // Handle payment logic here
  };

  const getTotalAmount = () => {
    return cartData.reduce(
      (total, item) => total + item.attributes.price * item.quantity,
      0
    );
  };

  const totalPrice = cartData.reduce(
    (total, item) => total + item.attributes.price * item.quantity,
    0
  );

  const checkoutWithCart = async () => {
    const loginUser = JSON.parse(localStorage.getItem("loginUser"));
    if (loginUser) {
      const checkoutData = {
        products: cartData,
        user_id: loginUser.user.id,
        total: 2000,
      };
      try {
        const res = await api.post(`order/apply`, checkoutData, {
          headers: { requireToken: true },
        });
        if (res.data) {
          setCartData([]);
          message.success("Payment Successfully");
          navigate("/products");
        }
      } catch (error) {
        message.error("Error");
      }
    } else {
      message.error("Please login in");
    }
  };

  return (
    <div className="checkout-container">
      <Row>
        <Col xs={24} sm={24} md={14}>
          <Card title="Payment Details" className="checkout-form">
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={1}>Bank</Radio>
              <Radio value={2}>Cash</Radio>
            </Radio.Group>
            {value === 1 && (
              <Form name="payment" layout="vertical" onFinish={onFinish}>
                <Form.Item
                  name="name"
                  label="Name on Card"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the name on card",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="cardNumber"
                  label="Card Number"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your card number",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="expiry"
                  label="Expiry Date"
                  rules={[
                    { required: true, message: "Please enter the expiry date" },
                  ]}
                >
                  <Input placeholder="MM/YY" />
                </Form.Item>

                <Form.Item
                  name="cvv"
                  label="CVV"
                  rules={[{ required: true, message: "Please enter the CVV" }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Pay {getTotalAmount().toFixed(2)} MMK
                  </Button>
                </Form.Item>
              </Form>
            )}
            {value === 2 && (
              <Button
                type="primary"
                htmlType="submit"
                block
                style={{ marginTop: "50px" }}
                onClick={checkoutWithCart}
              >
                Pay {getTotalAmount().toFixed(2)} MMK
              </Button>
            )}
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Card title="Order Summary" className="summary-card">
            <Row>
              <Col xs={10} sm={10} md={10} lg={10}>
                Item Name
              </Col>
              <Col xs={4} sm={4} md={4} lg={4}>
                Quantity
              </Col>
              <Col xs={8} sm={8} md={8} lg={8}>
                Subtotal
              </Col>
            </Row>
            {
              <List
                itemLayout="horizontal"
                dataSource={cartData}
                renderItem={(item) => (
                  <Row>
                    <Col xs={10} sm={10} md={10} lg={10}>
                      {item.attributes.name}
                    </Col>
                    <Col xs={4} sm={4} md={4} lg={4}>
                      {item.quantity}
                    </Col>
                    <Col xs={8} sm={8} md={8} lg={8}>
                      <div>{item.attributes.price * item.quantity} MMK</div>
                    </Col>
                  </Row>
                )}
              />
            }
            <Row style={{ padding: "10px 0", fontWeight: "bold" }}>
              <Col xs={14} sm={14} md={14} lg={14}>
                Total Amount:
              </Col>
              <Col xs={8} sm={8} md={8} lg={8}>
                {totalPrice} MMK
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CheckoutPage;
