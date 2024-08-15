import { Button, Card, Col, List, Modal, Row, Typography, message } from "antd";

import CartItem from "../../components/Cart/CartItem";
import { cart } from "../../store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

const { Title,Text } = Typography;

const CartPage = () => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useRecoilState(cart);

  const handleQuantityChange = (id, quantity, type) => {
    if (type === "minus") {
      setCartData(
        cartData.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    } else {
      setCartData((prevCartData) => {
        let cartList = prevCartData.map((item) => ({ ...item }));
        const productIndex = cartList.findIndex((d) => d.id === id);
        if (productIndex > -1) {
          if (
            cartList[productIndex].quantity <
            cartList[productIndex].attributes.stock
          ) {
            cartList[productIndex] = {
              ...cartList[productIndex],
              quantity: quantity,
            };
          } else {
            message.error("Out Of Stock");
          }
        }

        return cartList;
      });
    }
  };

  const handleRemove = (id) => {
    Modal.confirm({
      title: "Delete Confirmation",
      content: "Are you sure want to delete!!",
      okText: "Yes",
      cancelText: "Cancel",
      okButtonProps: {
        danger: true,
      },
      cancelButtonProps: {
        danger: true,
      },
      onOk: () => {
        setCartData(cartData.filter((item) => item.id !== id));
      },
    });
  };

  const totalPrice = cartData.reduce(
    (total, item) => total + item.attributes.price * item.quantity,
    0
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Card style={{ width: "90%", margin: "0 auto" }}>
      <Title level={2}>Shopping Cart</Title>
      <Row gutter={16} style={{ padding: "10px 0", fontWeight: "bold" }}>
        <Col xs={2} sm={2} md={2} lg={3}></Col>
        <Col xs={4} sm={4} md={4} lg={7}>
          <Text strong>Item Name</Text>
        </Col>
        <Col xs={2} sm={2} md={2} lg={2}>
          <Text strong>Item Price</Text>
        </Col>
        <Col xs={10} sm={10} md={10} lg={4}>
         <Text strong>Quantity</Text>
        </Col>
        <Col xs={4} sm={4} md={4} lg={4}>
          <Text strong>Subtotal</Text>
        </Col>
        <Col xs={2} sm={2} md={2} lg={4}></Col>
      </Row>
      <List
        itemLayout="horizontal"
        dataSource={cartData}
        renderItem={(item) => (
          <CartItem
            item={item}
            onQuantityChange={handleQuantityChange}
            onRemove={handleRemove}
          />
        )}
      />
      <Row style={{ padding: "10px 0", fontWeight: "bold" }}>
        <Col xs={8} sm={8} md={8} lg={12}></Col>
        <Col xs={10} sm={10} md={10} lg={4}>
          <Text strong>Total Amount:{" "}</Text>
        </Col>
        <Col xs={4} sm={4} md={4} lg={4}>
          <Text strong>{totalPrice} MMK</Text>
        </Col>
        <Col xs={2} sm={2} md={2} lg={4}></Col>
      </Row>
      {cartData.length > 0 && (
        <Row
          style={{ padding: "10px 0", fontWeight: "bold", marginTop: "30px" }}
        >
          <Col xs={8} sm={8} md={8} lg={12}></Col>
          <Col xs={10} sm={10} md={10} lg={4}></Col>
          <Col xs={4} sm={4} md={4} lg={4}>
            <Button
              type="primary"
              style={{ width: "100%" }}
              onClick={() => navigate("/checkout")}
            >
              Checkout
            </Button>
          </Col>
        </Row>
      )}
    </Card>
  );
};

export default CartPage;
