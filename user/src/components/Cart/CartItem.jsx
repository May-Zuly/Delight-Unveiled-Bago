import { Button, Col, List, Row } from "antd";

import { DeleteOutlined } from "@ant-design/icons";
import React from "react";

const CartItem = ({ item, onQuantityChange, onRemove }) => {
  const incrementQuantity = () =>
    onQuantityChange(item.id, item.quantity + 1, "add");
  const decrementQuantity = () =>
    onQuantityChange(item.id, item.quantity - 1, "minus");

  return (
    <List.Item>
      <Row style={{ width: "100%" }} align="middle">
        <Col xs={2} sm={2} md={2} lg={3}>
          <img
            src={`http://localhost:1337${item.attributes.image.data.attributes.url}`}
            alt={item.attributes.name}
            style={{ marginRight: "10px", width: "100px" }}
          />
        </Col>
        <Col xs={4} sm={4} md={4} lg={7}>
          {item.attributes.name}
        </Col>
        <Col xs={2} sm={2} md={2} lg={2}>
          {item.attributes.price} MMK
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
