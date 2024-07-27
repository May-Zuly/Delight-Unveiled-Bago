import { Button, message, Row, Col, Form, Input } from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  TwitterOutlined,
  FacebookOutlined,
  YoutubeOutlined,
  LinkedinOutlined,
} from "@ant-design/icons";
import "./ContactUsSection.css";
import api from "../../api/helper";

const ContactUsSection = () => {
  const sendMessage = async (value) => {
    const sendData = {
      name: value.name,
      from: value.email,
      to: "mayzulymoe56@gmail.com",
      subject: value.subject,
      message: value.message,
    };
    try {
      const res = await api.post("email", sendData, {
        headers: { requireToken: false },
      });
      message.success("Send Email Successfully");
      return res.data;
    } catch (error) {
      message.success("Error sending email");
      return null;
    }
  };

  return (
    <div className="contact-us-container py-6" id="contact-us">
      <div className="section-header" style={{ maxWidth: "500px" }}>
        <h1>Contact Us</h1>
        <p>
          Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam
          justo sed rebum vero dolor duo.
        </p>
      </div>
      <Row gutter={16} justify="center">
        <Col md={8} sm={24}>
          <div className="our-contact">
            <h3>Call Us</h3>
            <p>
              <PhoneOutlined /> +012 345 67890
            </p>
            <h3>Email Us</h3>
            <p>
              <MailOutlined /> info@example.com
            </p>
            <h3>Office Address</h3>
            <p>
              <EnvironmentOutlined /> 123 Street, New York, USA
            </p>
            <h3>Follow Us</h3>
            <div className="contact-icons">
              <Button
                shape="circle"
                icon={<TwitterOutlined />}
                className="btn btn-square btn-outline-light me-1"
              />
              <Button
                shape="circle"
                icon={<FacebookOutlined />}
                className="btn btn-square btn-outline-light me-1"
              />
              <Button
                shape="circle"
                icon={<YoutubeOutlined />}
                className="btn btn-square btn-outline-light me-1"
              />
              <Button
                shape="circle"
                icon={<LinkedinOutlined />}
                className="btn btn-square btn-outline-light me-1"
              />
            </div>
          </div>
        </Col>
        <Col lg={12} md={24}>
          <p className="about-contact">
            The contact form is currently inactive. Get a functional and working
            contact form with Ajax & PHP in a few minutes. Just copy and paste
            the files, add a little code and you're done.{" "}
            <a href="https://htmlcodex.com/contact-form">Download Now</a>.
          </p>
          <Form layout="vertical" onFinish={sendMessage}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Your Name"
                  name="name"
                  rules={[
                    { required: true, message: "Please input your name" },
                  ]}
                >
                  <Input placeholder="Your Name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Your Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email" },
                  ]}
                >
                  <Input type="email" placeholder="Your Email" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              label="Subject"
              name="subject"
              rules={[{ required: true, message: "Please input your subject" }]}
            >
              <Input placeholder="Subject" />
            </Form.Item>
            <Form.Item
              label="Message"
              name="message"
              rules={[{ required: true, message: "Please input your message" }]}
            >
              <Input.TextArea
                placeholder="Leave a message here"
                style={{ height: 200 }}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                shape="round"
                size="large"
                htmlType="submit"
              >
                Send Message
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default ContactUsSection;
