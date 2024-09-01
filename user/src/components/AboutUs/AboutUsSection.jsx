import React from "react";
import { Row, Col, Typography, Button } from "antd";
import { Link } from "react-router-dom";
import "./AboutUsSection.css";

const { Title, Paragraph } = Typography;

const AboutUsSection = () => {
  return (
    <div className="about_section layout_padding long_section" id="about-us">
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} lg={12}>
          <div className="img-box">
            <img
              src="/src/assets/images/about-img.png"
              alt="About Us"
              className="about-us-image"
            />
          </div>
        </Col>
        <Col xs={24} lg={12}>
          <div className="detail-box">
            <div className="heading_container">
              <Title level={2} className="about-us-title">
                ကျွန်ုပ်တို့၏ အကြောင်းအရာများ
              </Title>
            </div>
            <Paragraph className="about-us-paragraph">
              Delight Unveiled Bago မှ ကြိုဆိုပါတယ်။ ကျွန်ုပ်တို့သည် သင့်အား
              ဖြစ်နိုင်သမျှ အကောင်းဆုံး အတွေ့အကြုံများ ပေးအပ်ရန် ရည်ရွယ်ပါသည်။
              ကျွန်ုပ်တို့၏ရည်ရွယ်ချက်မှာ
              ကျွန်ုပ်တို့၏ထူးခြားသောထုတ်ကုန်များနှင့် ဝန်ဆောင်မှုများမှတစ်ဆင့်
              ကျွန်ုပ်တို့၏ဖောက်သည်များထံ ပျော်ရွှင်ကြည်နူးမှုကို ယူဆောင်လာရန်ဖြစ်သည်။
            </Paragraph>
            <ul className="about-us-list">
              <li>
                <span className="icon">✔</span>အရည်အသွေးမြင့်ထုတ်ကုန်များ
              </li>
              <li>
                <span className="icon">✔</span>ထူးခြားသောဖောက်သည်ဝန်ဆောင်မှု
              </li>
              <li>
                <span className="icon">✔</span>ဆန်းသစ်သောဖြေရှင်းနည်းများ
              </li>
            </ul>
            <Button
              type="primary"
              size="large"
              href=""
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
              <Link to="/about-us">ပိုမိုဖတ်ရှုရန်</Link>
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AboutUsSection;
