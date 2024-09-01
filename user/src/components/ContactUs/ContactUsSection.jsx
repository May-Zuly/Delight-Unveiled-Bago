import { Button, message, Row, Col, Form, Input, Typography } from "antd";
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

const { Title, Paragraph } = Typography;

const ContactUsSection = () => {
  const sendMessage = async (value) => {
    const sendData = {
      name: value.name,
      from: value.email,
      to: "delightunveiledbagoregion@gmail.com",
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
        <Title level={2} className="contact-us-title">
          ကျွန်ုပ်တို့ကိုဆက်သွယ်ရန်
        </Title>
        <Paragraph className="contact-us-description">
          Delight Unveiled: ပဲခူးတိုင်း ဒေသကြီး၏ ကုန်စုံဆိုင်များနှင့်
          အနုပညာပစ္စည်းများကို လာရောက်ကြည့်ရှုသည့်အတွက် ကျေးဇူးတင်ပါသည်။
          ကျွန်ုပ်တို့သည် သင့်ထံမှ ကြားသိရပြီး Delight Unveiled နှင့်
          သင့်အတွေ့အကြုံသည် ကြည်နူးဖွယ်ကောင်းကြောင်း သေချာစေပါသည်။
        </Paragraph>
      </div>
      <Row gutter={16} justify="center" className="about-us-row">
        <Col lg={8} xs={24} className="about-us-col">
          <div className="our-contact">
            <h3>ဆက်သွယ်ရန်</h3>
            <p>
              <PhoneOutlined /> +၉၅၉ ၄၂၆ ၅၅၇ ၇၃၇
            </p>
            <h3>အီးမေးလ်ပို့ရန်</h3>
            <p>
              <MailOutlined /> delightunveiledbagoregion@gmail.com
            </p>
            <h3>ရုံးလိပ်စာ</h3>
            <p>
              <EnvironmentOutlined /> ဗိုလ်ချုပ်လမ်း, ပြည်မြို့,ပဲခူးတိုင်း
            </p>
            <h3>Follow လုပ်ရန်</h3>
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
              အကယ်၍ သင်သည် ကျွန်ုပ်တို့၏ပလပ်ဖောင်းပေါ်တွင် သင့်ထုတ်ကုန်များကို
              တင်သွင်းရန် စိတ်ပါဝင်စားပါပြီး ထုတ်လုပ်သူ သို့မဟုတ်
              ရောင်းချသူတစ်ဦးဖြစ်လိုပါက၊ ကျွန်ုပ်တို့၏အဖွဲ့ထံသို့ အောက်ပါဖောင်မှတဆင့်
              သို့မဟုတ် ဖုန်းခေါ်ဆိုမှုမှတဆင့် ဆက်သွယ်နိုင်ပါသည်။ အခြားစုံစမ်းမေးမြန်းမှုများ
              သို့မဟုတ် အကြံပြုချက်များအတွက် ကျေးဇူးပြု၍ အောက်ဖော်ပြပါ
              ဆက်သွယ်ရန်ဖောင်ကိုမှ ပေးပို့ပါ။ ကျွန်ုပ်တို့မှ တတ်နိုင်သမျှအမြန်ဆုံး ပြန်လည်ပေးပို့ပါမည်။
              {/* <a href="https://htmlcodex.com/contact-form">Download Now</a>. */}
            </p>
            <Form layout="vertical" onFinish={sendMessage}>
              <Row gutter={16}>
                <Col span={12} xs={24} sm={12}>
                  <Form.Item
                    label="အမည်"
                    name="name"
                    rules={[
                      { required: true, message: "ကျေးဇူးပြု၍ သင့်အမည်ထည့်ပါ။" },
                    ]}
                  >
                    <Input placeholder="အမည်ထည့်ရန်" />
                  </Form.Item>
                </Col>
                <Col span={12} xs={24} sm={12}>
                  <Form.Item
                    label="အီးမေးလ်"
                    name="email"
                    rules={[
                      { required: true, message: "ကျေးဇူးပြု၍ သင့်အီးမေးလ်ထည့်ပါ။" },
                    ]}
                  >
                    <Input type="email" placeholder="အီးမေးလ်ထည့်ရန်" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                label="အကြောင်းအရာခေါင်းစဉ်"
                name="subject"
                rules={[
                  { required: true, message: "ကျေးဇူးပြု၍ အကြောင်းအရာခေါင်းစဉ်ထည့်ပါ။" },
                ]}
              >
                <Input placeholder="အကြောင့်အရာထည့်ရန်" />
              </Form.Item>
              <Form.Item
                label="စာတို"
                name="message"
                rules={[
                  { required: true, message: "Please input your message" },
                ]}
              >
                <Input.TextArea
                  placeholder="စာတိုချန်ထားရန်"
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
                    backgroundColor: "#995f20",
                    borderColor: "#aa620f",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#dda15e";
                    e.currentTarget.style.borderColor = "#995f20";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#995f20";
                    e.currentTarget.style.borderColor = "#aa620f";
                  }}
                >
                  အီးမေးလ်ပို့ပါ
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
