import { List, Card, Typography, Row, Col, Modal, Button } from "antd";
import CartItem from "../../components/Cart/CartItem";
import { cart } from "../../store";
import { useRecoilState } from "recoil";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const CartPage = () => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useRecoilState(cart);

  const handleQuantityChange = (id, quantity) => {
    setCartData(
      cartData.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
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
          Item Name
        </Col>
        <Col xs={2} sm={2} md={2} lg={2}>
          Item Price
        </Col>
        <Col xs={10} sm={10} md={10} lg={4}>
          Quantity
        </Col>
        <Col xs={4} sm={4} md={4} lg={4}>
          Subtotal
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
          Total Amount:{" "}
        </Col>
        <Col xs={4} sm={4} md={4} lg={4}>
          {totalPrice} MMK
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
