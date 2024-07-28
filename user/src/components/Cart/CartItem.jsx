import React from "react";
import { List, Button, Row, Col } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

const CartItem = ({ item, onQuantityChange, onRemove }) => {
  const incrementQuantity = () => onQuantityChange(item.id, item.quantity + 1);
  const decrementQuantity = () => onQuantityChange(item.id, item.quantity - 1);

  return (
    <List.Item>
      <Row style={{ width: "100%" }} align="middle">
        <Col xs={8} sm={8} md={8} lg={12}>
          <List.Item.Meta
            title={item.attributes.name}
            description={`Price: ${item.attributes.price} MMK`}
          />
        </Col>
        <Col xs={10} sm={10} md={10} lg={4}>
          <Button onClick={decrementQuantity} disabled={item.quantity <= 1}>
            -
          </Button>
          <span style={{ margin: "0 10px" }}>{item.quantity}</span>
          <Button onClick={incrementQuantity}>+</Button>
        </Col>
        <Col xs={4} sm={4} md={4} lg={4}>
          <div>{item.attributes.price * item.quantity} MMK</div>
        </Col>
        <Col xs={2} sm={2} md={2} lg={4}>
          <Button
            type="link"
            style={{ color: "red" }}
            icon={<DeleteOutlined />}
            onClick={() => onRemove(item.id)}
          />
        </Col>
      </Row>
    </List.Item>
  );
};

export default CartItem;
