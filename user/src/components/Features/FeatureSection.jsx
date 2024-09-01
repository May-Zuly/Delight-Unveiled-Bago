import React from 'react';
import { Row, Col, Card, Typography } from 'antd';
import { 
  AppstoreOutlined,
  InfoCircleOutlined,
  SearchOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  SolutionOutlined 
} from '@ant-design/icons';
import './FeatureSection.css'; // Import the CSS file

const { Title, Paragraph } = Typography;

const features = [
  {
    icon: <AppstoreOutlined className="feature-icon"/>,
    title: "ကုန်ပစ္စည်းစာရင်းများနှင့် စစ်ထုတ်မှုများ",
    description: "ကုန်ခြောက်နှင့် ရှေးဟောင်းပစ္စည်းများအတွက် အမျိုးအစားများပါရှိသော ပြည့်စုံသော ထုတ်ကုန်စာရင်းများ၊ စျေးနှုန်း၊ အမျိုးအစား၊ လူကြိုက်များမှုနှင့် အသစ်ဝင်ရောက်မှုများအလိုက် စီရန်အဆင့်မြင့် စစ်ထုတ်ခြင်းရွေးချယ်မှုများ",
  },
  {
    icon: <InfoCircleOutlined className="feature-icon"/>,
    title: "အသေးစိတ်ထုတ်ကုန်အချက်အလက်",
    description: "အရည်အသွေးမြင့် ပုံများ၊ ဖော်ပြချက်များ၊ ဈေးနှုန်းများနှင့် အသုံးပြုသူ သုံးသပ်ချက်များပါရှိသော အသေးစိတ်ထုတ်ကုန်စာမျက်နှာများ၊ ထုတ်ကုန်အရင်းအမြစ်နှင့် ထုတ်လုပ်မှုနည်းလမ်းများဆိုင်ရာ အချက်အလက်",
  },
  {
    icon: <SearchOutlined className="feature-icon"/>,
    title: "ရှာဖွေရန် လုပ်ဆောင်မှုများ",
    description: "အသုံးပြုသူများအား အမည်၊ အမျိုးအစား သို့မဟုတ် သော့ချက်စကားလုံးများဖြင့် ထုတ်ကုန်များကို လျင်မြန်စွာရှာဖွေနိုင်စေမည့် ခိုင်မာသောရှာဖွေမှုအင်္ဂါရပ်၊ အသုံးပြုသူအတွေ့အကြုံကို မြှင့်တင်ရန် အကြံပြုချက်များကို အလိုအလျောက်ဖြည့်ပါ",
  },
  {
    icon: <UserOutlined className="feature-icon"/>,
    title: "အသုံးပြုသူအထောက်အထားစိစစ်ခြင်းနှင့် ပရိုဖိုင်များ",
    description: "အသုံးပြုသူမှတ်ပုံတင်ခြင်းနှင့် အကောင့်ဝင်ခြင်းကို လုံခြုံအောင်ပြုလုပ်နိုင်မှု၊ ကိုယ်ရေးကိုယ်တာအချက်အလက်၊ မှာယူမှုမှတ်တမ်းနှင့် စိတ်ကြိုက်ရွေးချယ်မှုများကို စီမံခန့်ခွဲရန် အသုံးပြုသူပရိုဖိုင်များ",
  },
  {
    icon: <ShoppingCartOutlined className="feature-icon"/>,
    title: "စျေးဝယ်လှည်းနှင့် ငွေရှင်းခြင်း",
    description: "အသုံးပြုသူများသည် ၎င်းတို့၏ ရွေးချယ်ထားသော ထုတ်ကုန်များကို ထည့်ရန်၊ ကြည့်ရှုရန်နှင့် ပြင်ဆင်ရန် အလိုလိုသိနိုင်သော စျေးဝယ်ယူခြင်း၊ ငွေပေးချေမှုရွေးချယ်စရာများစွာဖြင့် လုံခြုံပြီး သက်သာသော ငွေပေးချေမှုလုပ်ငန်းစဉ်များ",
  },
  {
    icon: <SolutionOutlined className="feature-icon"/>,
    title: "ထုတ်လုပ်သူ စာမျက်နှာ",
    description: "ထုတ်လုပ်သူများ ၎င်းတို့၏ထုတ်ကုန်များကို စာရင်းပြုစုရန်နှင့် စီမံခန့်ခွဲရန်အတွက် သီးခြားပေါ်တယ် အရောင်း၊ စာရင်းနှင့် ပို့ကုန်ရွေးချယ်မှုများကို ခြေရာခံရန် ကိရိယာများ။",
  },
];

const Features = () => (
  <div className="features-container">
    <Title level={2} className="features-title">
      "Delight Unveiled" ၏လုပ်ဆောင်ချက်များ
    </Title>
    <Row gutter={[16, 16]}>
      {features.map((feature, index) => (
        <Col key={index} xs={24} sm={12} lg={8}>
          <Card hoverable className="feature-card">
            <div className="feature-icon-container">{feature.icon}</div>
            <Title level={4} style={{fontFamily:'"Lato", sans-serif'}}>{feature.title}</Title>
            <Paragraph className="feature-description">{feature.description}</Paragraph>
          </Card>
        </Col>
      ))}
    </Row>
  </div>
);

export default Features;
