import React from "react";
import { Row, Col, Image, Typography, Button } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import "./GroceriesSection.css";
import Grocery from "../../assets/images/grocery-img.jpg";
const { Title, Paragraph, Text } = Typography;

const GroceriesSection = () => {
  return (
    <div className="organic-section" id="home">
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} md={24} lg={12}>
          <div className="img-box">
            <Image
              src={Grocery}
              alt="Organic Farmer"
              preview={false}
              className="organic-image"
              style={{width:"500px"}}
            />
          </div>
          {/* <div className="img-box">
          </div> */}
        </Col>
        <Col xs={24} md={24} lg={12}>
          <div className="organic-content">
            <Title level={2} className="content-title">
              အကောင်းဆုံး ဒေသထွက်ကုန်ပစ္စည်းများ
            </Title>
            <Paragraph className="content-description">
              ကြွယ်ဝသော ယဉ်ကျေးမှု အမွေအနှစ်များ လက်ရာမြောက်သော
              ဒေသထွက်ကုန်များနှင့် ကိုက်ညီသည့် ပဲခူးတိုင်းအတွင်းရှိ
              မြို့နယ်အသီးသီး၏ အကောင်းဆုံး ကမ်းလှမ်းမှုများကို
              စူးစမ်းလေ့လာပါ။ဤသည်မှာ ပဲခူးတိုင်း၏ ထူးခြားသော ကျက်သရေနှင့်
              ရိုးရာဓလေ့ကို ပြသသည့် အကောင်းဆုံး ရှေးဟောင်းပစ္စည်းနှင့်
              စားသောက်ကုန်တစ်ချို့အကြောင်းကိုဖော်ပြထားသည်။
            </Paragraph>
            <ul className="organic-list">
              <li>
                <CheckCircleOutlined className="icon" />
                <Text className="list-text">
                  ရိုးရာဒီဇိုင်းများဖြင့် အသေးစိတ်လက်ရာမြောက်အောင်ပြုလုပ်ထားသော
                  လက်မှုပစ္စည်းများ
                </Text>
              </li>
              <li>
                <CheckCircleOutlined className="icon" />
                <Text className="list-text">
                  ဝါး၊ သစ်သာ နှင့် စကျင်ကျောက်ဖြင့် ပြုလုပ်ထားသော
                  ရိုးရာလက်မှုပစ္စည်းမျာ
                </Text>
              </li>
              <li>
                <CheckCircleOutlined className="icon" />
                <Text className="list-text">
                  ရိုးရာယက်လုပ်နည်းများနှင့် လုံချည်များအပါအဝင် ထည်ဝါစွာရက်လုပ်ထားသော ဒေသထွက်ပစ္စည်းများကို
                  ပြသထားမှု
                </Text>
              </li>
              <li>
                <CheckCircleOutlined className="icon" />
                <Text className="list-text">
                  လက်ဆက်ပြီး အရသာရှိသော ဒေသထွက်စားသောက်ကုန်များ
                </Text>
              </li>
              <li>
                <CheckCircleOutlined className="icon" />
                <Text className="list-text">
                  ပဲခူးတိုင်းဒေသကြီး၏ မြေသြဇာကောင်းသော လယ်ကွင်းများတွင် စိုက်ပျိုးကြသော လက်ဆတ်သော အစားအစာများ
                </Text>
              </li>
              <li>
                <CheckCircleOutlined className="icon" />
                <Text className="list-text">
                နနွင်း၊ ငရုတ်သီး နှင့် စပါးလင် အပါအဝင် ဒေသဆိုင်ရာ ဟင်းလျာများအတွက် ထူးခြားပြီး စစ်မှန်သော အရသာကို ပေးစွမ်းသော စားသောက်ကုန်များ
                </Text>
              </li>
            </ul>
            {/* <Button type="primary" shape="round" size="large">Read More</Button> */}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default GroceriesSection;
