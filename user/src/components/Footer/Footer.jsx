// import React from 'react';
// import { Layout } from 'antd';
// import './Footer.css';

// const { Footer } = Layout;

// const AppFooter = () => (
//   <Footer className="footer">
//     <div className="footer-content">
//       <p>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
//       <p>Contact: info@myapp.com</p>
//     </div>
//   </Footer>
// );

// export default AppFooter;

import React from 'react';
import { Layout, Row, Col, Typography, List,Button } from 'antd';
import { TwitterOutlined, FacebookFilled, PhoneOutlined, MailOutlined, EnvironmentOutlined, HeartFilled,YoutubeFilled,LinkedinFilled, BorderBottomOutlined} from '@ant-design/icons';
import "./Footer.css"

const { Footer } = Layout;
const { Title, Text, Paragraph, Link } = Typography;

const FooterComponent = () => (
  <Footer className="footer">
    <div className="footer-content">
      <Row gutter={[16, 16]}>
        <Col xs={24} md={6}>
          <div className="footer-widget mb-4">
            <Title level={2} className='footer-heading'>Meditative</Title>
            <Paragraph className='footer-paragraph'>
              Pertaining to or involving deep, contemplative, or reflective
              thought, often aimed at achieving mental clarity, relaxation, or
              spiritual insight.
            </Paragraph>
            <div className="mt-3 footer-icons">
                <Button shape="circle" icon={<TwitterOutlined />} className="btn btn-square btn-outline-light me-1" />
                <Button shape="circle" icon={<FacebookFilled />} className="btn btn-square btn-outline-light me-1" />
                <Button shape="circle" icon={<YoutubeFilled />} className="btn btn-square btn-outline-light me-1" />
                <Button shape="circle" icon={<LinkedinFilled/>} className="btn btn-square btn-outline-light me-1" /> 
              </div>
          </div>
        </Col>
        <Col xs={24} md={6}>
          <div className="footer-widget mb-4" style={{justifyContent:'center',display:'flex'}}>
            <div>
              <Title level={2} className='footer-heading'>Popular Links</Title>
              <List
                dataSource={['Yoga for Beginners', 'Yoga for Pregnant', 'Yoga Barre', 'Yoga Advance']}
                renderItem={item => <List.Item style={{borderBlockEnd:'none'}}><Link href="classes.html">{item}</Link></List.Item>}
                
              />
            </div>
          </div>
        </Col>
        <Col xs={24} md={6}>
          <div className="footer-widget mb-4" style={{justifyContent:'center',display:'flex'}}>
            <div>
              <Title level={2} className='footer-heading'>Quick Links</Title>
              <List
                dataSource={['Home', 'About Us', 'Products', 'Contact Us']}
                renderItem={item => <List.Item style={{borderBlockEnd:'none'}}><Link href={`${item.toLowerCase()}.html`}>{item}</Link></List.Item>}
              />
            </div>
          </div>
        </Col>
        <Col xs={24} md={6}>
          <div className="footer-widget mb-4" style={{justifyContent:'center',display:'flex'}}>
            <div>
            <Title level={2} className='footer-heading'>Have a Questions?</Title>
            <List>
              <List.Item style={{borderBlockEnd:'none'}}>
                <EnvironmentOutlined className="icon" />
                <Text className="text">Pyay</Text>
              </List.Item>
              <List.Item  style={{borderBlockEnd:'none'}}>
                <PhoneOutlined className="icon"  />
                <Link href="tel:+95-426-557-737" className="text">+95-426-557-737</Link> 
              </List.Item>
              <List.Item>
                <MailOutlined className="icon"/>
                <Link href="mailto:info@millieyoga.com" className="text">info@millieyoga.com</Link>
              </List.Item>
            </List>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Text className="mb-0">
            Copyright &copy; All rights reserved | This template is made with <HeartFilled /> by <Link href="#" target="_blank">EmilyMay</Link>
          </Text>
        </Col>
      </Row>
    </div>
  </Footer>
);

export default FooterComponent;

