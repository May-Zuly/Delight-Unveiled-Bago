import { Button, message, Row, Col, Form, Input,Typography } from "antd";
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

const {Title,Paragraph} = Typography;

const ContactUsSection = () => {
  const sendMessage = async (value) => {
    const sendData = {
      name: value.name,
      from: value.email,
      to: "delightunveiledbago@gmail.com",
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
      <div className="contactus-section-header" style={{ maxWidth: "500px" }}>
        <Title level={2} className="contact-us-title">Contact Us</Title>
        <Paragraph className="contact-us-description">
          Thank you for visiting Delight Unveiled: Groceries and Artifacts of
          Bago Region.We look forward to hearing from you and ensuring your
          experience with Delight Unveiled is delightful!
        </Paragraph>
      </div>
      <Row gutter={16} justify="center" className="about-us-row">
        <Col lg={8} xs={24} className="about-us-col">
          <div className="our-contact">
            <h3>Call Us</h3>
            <p>
              <PhoneOutlined /> +959 426 557737
            </p>
            <h3>Email Us</h3>
            <p>
              <MailOutlined /> delightunveiledbago@gmail.com
            </p>
            <h3>Office Address</h3>
            <p>
              <EnvironmentOutlined /> BoGyok Street, Pyay, Bago Region
            </p>
            <h3>Follow Us</h3>
            <div className="contact-icons">
              <Button
                shape="circle"
                icon={<TwitterOutlined />}
                className="btn-square"
                href="https://www.twitter.com/"
              />
              <Button
                shape="circle"
                icon={<FacebookOutlined />}
                className="btn-square"
                href="https://www.facebook.com/"
              />
              <Button
                shape="circle"
                icon={<YoutubeOutlined />}
                className="btn-square"
                href="https://www.youtube.com/"
              />
              <Button
                shape="circle"
                icon={<LinkedinOutlined />}
                className="btn-square"
                href="https://www.linkedin.com/in/may-zuly-moe-emily-a7697931a/"
              />
            </div>
          </div>
        </Col>
        <Col lg={12} md={24} className="about-us-col">
        <div className="contact-us-form">
          <p className="about-contact">
            If you are a producer or seller interested in listing your products
            on our platform, please reach out to our team from contact form or
            call .For any other inquiries or feedback, please fill out the
            contact form below, and we will get back to you as soon as possible.
            {/* <a href="https://htmlcodex.com/contact-form">Download Now</a>. */}
          </p>
          <Form layout="vertical" onFinish={sendMessage}>
            <Row gutter={16}>
              <Col span={12} xs={24} sm={12}>
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
              <Col span={12} xs={24} sm={12}>
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
                style={{
                    backgroundColor: '#995f20',
                    borderColor: '#aa620f',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#dda15e';
                    e.currentTarget.style.borderColor = '#995f20';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#995f20';
                    e.currentTarget.style.borderColor = '#aa620f';
                }}
              >
                Send Message
              </Button>
            </Form.Item>
          </Form>
        </div>
        </Col>   
      </Row>
    </div>
  );
};

export default ContactUsSection;
