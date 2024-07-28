import { Card, Form, Input, Button, Row, Col, List, Typography } from "antd";
import { useRecoilValue } from "recoil";
import { cart } from "../../store";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const cartData = useRecoilValue(cart);

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

  return (
    <div className="checkout-container">
      <Row gutter={16}>
        <Col xs={24} sm={24} md={12}>
          <Card title="Payment Details" className="checkout-form">
            <Form name="payment" layout="vertical" onFinish={onFinish}>
              <Form.Item
                name="name"
                label="Name on Card"
                rules={[
                  { required: true, message: "Please enter the name on card" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="cardNumber"
                label="Card Number"
                rules={[
                  { required: true, message: "Please enter your card number" },
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
                  Pay ${getTotalAmount().toFixed(2)}
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>

        <Col xs={24} sm={24} md={12}>
          <Card title="Order Summary" className="summary-card">
            <List
              itemLayout="horizontal"
              dataSource={cartData}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    title={item.attributes.name}
                    description={`Quantity: ${item.quantity}`}
                  />
                  <Typography.Text>
                    ${(item.attributes.price * item.quantity).toFixed(2)}
                  </Typography.Text>
                </List.Item>
              )}
            />
            <div className="total-amount">
              Total: ${getTotalAmount().toFixed(2)}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CheckoutPage;
