import "./CheckoutPage.css";

import { Button, Card, Col, Form, List, Row, Upload, message } from "antd";

import ImgCrop from "antd-img-crop";
import { PlusOutlined } from "@ant-design/icons";
import { Radio } from "antd";
import api from "../../api/helper";
import { cart } from "../../store";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useState } from "react";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState(1);

  const [fileList, setFileList] = useState([]);

  const onFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const [cartData, setCartData] = useRecoilState(cart);

  const onFinish = async () => {
    const loginUser = JSON.parse(localStorage.getItem("loginUser"));
    if (loginUser) {
      const data = {
        products: cartData,
        user_id: loginUser.user.id,
        total: getTotalAmount(),
        payment_type: "onlinePay",
      };
      const formData = new FormData();
      if (fileList.length > 0) {
        formData.append("files.image", fileList[0].originFileObj, data.name);
      }
      formData.append("data", JSON.stringify(data));
      try {
        const res = await api.post(`order/apply`, formData, {
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
        total: getTotalAmount(),
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
              <Radio value={1}>Mobile Banking</Radio>
              <Radio value={2}>Cash On Delivery</Radio>
            </Radio.Group>
            {value === 1 && (
              <>
                <div>Payment Information</div>
                <Form name="payment" layout="vertical" onFinish={onFinish}>
                  <Form.Item
                    label=""
                    name="image"
                    valuePropName="fileList"
                    style={{ marginTop: "10px" }}
                  >
                    <ImgCrop rotationSlider>
                      <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onChange={onFileChange}
                        maxCount={1}
                      >
                        {fileList.length < 1 && (
                          <button
                            style={{ border: 0, background: "none" }}
                            type="button"
                          >
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                          </button>
                        )}
                      </Upload>
                    </ImgCrop>
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                      Pay {getTotalAmount().toFixed(2)} MMK
                    </Button>
                  </Form.Item>
                </Form>
              </>
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
