import "./CheckoutPage.css";

import {
  Button,
  Card,
  Col,
  Form,
  Input,
  List,
  Modal,
  Row,
  Upload,
  message,
} from "antd";

import ImgCrop from "antd-img-crop";
import { PlusOutlined } from "@ant-design/icons";
import { Radio } from "antd";
import api from "../../api/helper";
import { cart } from "../../store";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useState } from "react";

const CheckoutPage = () => {
  const loginUser = JSON.parse(localStorage.getItem("loginUser"));
  const [imageForm] = Form.useForm();
  const navigate = useNavigate();
  const [value, setValue] = useState(1);

  const [fileList, setFileList] = useState([]);

  const onFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    imageForm.setFieldsValue({ image: fileList });
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };
  const [cartData, setCartData] = useRecoilState(cart);

  const checkoutWithOnlinePayment = async () => {
    if (loginUser) {
      const data = {
        products: cartData,
        user_id: loginUser.user.id,
        total: getTotalAmount(),
        payment_type: "onlinePay",
        order_phone: form.getFieldValue("phone"),
        order_address: form.getFieldValue("address"),
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
        const errors = [...error.response.data.error.details];
        errors.map((text) => {
          message.error(text);
        });
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
        order_phone: form.getFieldValue("phone"),
        order_address: form.getFieldValue("address"),
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
        const errors = [...error.response.data.error.details];
        errors.map((text) => {
          message.error(text);
        });
      }
    } else {
      message.error("Please login in");
    }
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("myself");
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then(() => {
        setIsModalVisible(false);
        if (value === 1) checkoutWithOnlinePayment();
        if (value === 2) checkoutWithCart();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
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
                <Form
                  name="payment"
                  layout="vertical"
                  form={imageForm}
                  onFinish={() => {
                    loginUser
                      ? setIsModalVisible(true)
                      : message.error("Please Login...");
                  }}
                >
                  <Form.Item
                    label=""
                    name="image"
                    valuePropName="fileList"
                    style={{ marginTop: "10px" }}
                    rules={[
                      {
                        required: true,
                        message: "Please upload your payment screen shot!",
                      },
                    ]}
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
                onClick={() => setIsModalVisible(true)}
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

      <Modal
        title="Delivery Information"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="deliveryType"
            label="Delivery Type"
            rules={[
              { required: true, message: "Please select a delivery type!" },
            ]}
          >
            <Radio.Group
              onChange={(e) => {
                setSelectedOption(e.target.value);
                form.setFieldsValue({ address: "" });
                form.setFieldsValue({ phone: "" });
                if (e.target.value === "myself") {
                  form.setFieldsValue({ address: loginUser.user.address });
                  form.setFieldsValue({ phone: loginUser.user.phoneNumber });
                }
              }}
              value={selectedOption}
            >
              <Radio value="myself">For Myself</Radio>
              <Radio value="other">For Others</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: "Please enter your address!" }]}
          >
            <Input placeholder="Enter address" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: "Please enter your phone number!",
              },
            ]}
          >
            <Input placeholder="Enter phone number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CheckoutPage;
