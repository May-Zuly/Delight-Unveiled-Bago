import React from "react";
import { Layout ,Typography} from "antd";

const { Content } = Layout;
const {Title} = Typography;
const BagoMap = () => {
  return (
    <Layout style={{background:"#f9f9f9"}}>
      <Content style={{ padding: "50px" }}>
        <Title level={2} style={{textAlign:'center',padding:"30px 0",fontSize:"36px",color:"#1e1e1e"}}>
          ပဲခူးတိုင်းဒေသကြီးမှ ကြိုဆိုပါ၏
        </Title>
        <div style={{ width: "100%", height: "400px" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d488994.5464253482!2d95.99993020270957!3d17.336874318760516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c5d742ed792e01%3A0x2f9dbf760e8b2c11!2sBago%2C%20Myanmar%20(Burma)!5e0!3m2!1sen!2s!4v1692367000000!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </Content>
    </Layout>
  );
};

export default BagoMap;
