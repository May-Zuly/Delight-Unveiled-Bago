import React from "react";
import { Carousel, Typography, Button, Row, Col, Card } from "antd";
import {
  LeftOutlined,
  RightOutlined,
  AimOutlined,
  HeartOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import "./AboutUsPage.css";
//import AboutUsSection from '../../components/AboutUs/AboutUsSection';

const { Title, Paragraph } = Typography;

const testimonies = [
  {
    image: "/src/assets/images/grocery.jpg",
    text: "Delight Unveiled Bago has the best products I have ever used!",
    name: "Customer 1",
  },
  {
    image: "/src/assets/images/grocery.jpg",
    text: "Amazing service and high-quality products.",
    name: "Customer 2",
  },
  {
    image: "/src/assets/images/grocery.jpg",
    text: "I am extremely satisfied with my purchases.",
    name: "Customer 3",
  },
];

const AboutUsPage = () => {
  const carouselRef = React.useRef(null);

  const next = () => {
    carouselRef.current.next();
  };

  const prev = () => {
    carouselRef.current.prev();
  };

  return (
    <div className="about_us_page layout_padding long_section">
      <div className="about-section">
        <Row>
          <Col xs={24} md={8}>
            <div className="aboutus-image-box">
              <img
                src="/src/assets/images/aboutus1.jpg"
                alt="About Us"
                className="about-image"
              />
            </div>
          </Col>
          <Col xs={24} md={16} className="about-text">
            <h2 style={{ textAlign: "center" }}>About Us</h2>
            <h3 style={{ textAlign: "center" }}>
              Groceries and Artifacts of Bago Region
            </h3>
            <p>
              At Delight Unveiled, we believe in the power of community and the
              importance of supporting local producers. Our platform connects
              you directly with farmers, artisans, and craftsmen, ensuring that
              you receive the freshest groceries and the most exquisite
              artifacts. Every purchase you make helps sustain the livelihoods
              of these dedicated individuals and preserves the cultural heritage
              of Bago.
              <br />
              <span>Our product range includes:</span>
            </p>
            <ul className="about-us-list">
              <li>
                <span className="icon">✔</span>Fresh and organic produce
              </li>
              <li>
                <span className="icon">✔</span>Traditional handcrafted artifacts
              </li>
              <li>
                <span className="icon">✔</span>Specialty items unique to the
                Bago Region
              </li>
            </ul>
          </Col>
        </Row>
      </div>

      <div className="values-section">
        <h2>My Values</h2>
        <Row gutter={16}>
          <Col xs={24} md={8}>
            <Card hoverable className="value-card">
              <div className="value-card-icon-title">
                <AimOutlined className="value-card-icon" />
                <h4>Mission</h4>
              </div>
              <div className="value-card-title-divider" />
                <p>
                  Our mission is to connect local producers with a global
                  audience, ensuring the highest quality of products through
                  rigorous standards and fair practices. We aim to foster
                  sustainable growth and development within local communities,
                  supporting their economic well-being while educating and
                  inspiring customers about the cultural significance and
                  origins of our products.
                </p>      
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card hoverable className="value-card">
              <div className="value-card-icon-title">
                <BulbOutlined className="value-card-icon" />
                <h4>Vision</h4>
              </div>
              <div className="value-card-title-divider" />
              <p>
                Our vision is to be the leading online marketplace for authentic
                groceries and artifacts from the Bago Region, expanding our
                reach globally to bring the richness of Bago’s heritage to
                households everywhere. We strive to continuously innovate and
                improve our platform for the benefit of both producers and
                customers alike.
              </p>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card hoverable className="value-card">
              <div className="value-card-icon-title">
                <HeartOutlined className="value-card-icon" />
                <h4>Value</h4>
              </div>
              <div className="value-card-title-divider" />
              <p>
                Our core values emphasize sustainability, quality, and cultural
                appreciation. We are committed to ethical practices that support
                local communities and ensure that our customers receive products
                of the highest standard, enriched with the cultural heritage of
                the Bago Region.
              </p>
            </Card>
          </Col>
        </Row>
      </div>

      <div className="aboutus-testinomy">
        <Title level={2} className="aboutus-carousel-title">
          Successful Stores with Testimony
        </Title>

        <div className="aboutus-carousel-container">
          <Carousel autoplay ref={carouselRef}>
            {testimonies.map((testimony, index) => (
              <div key={index} className="aboutus-carousel-slide">
                <Row align="middle">
                  <Col xs={24} md={6}>
                    <div className="aboutus-carousel-image-container">
                      <img
                        src={testimony.image}
                        alt={testimony.name}
                        className="aboutus-carousel-image"
                      />
                    </div>
                  </Col>
                  <Col xs={24} md={18}>
                    <div className="aboutus-carousel-content">
                      <p className="aboutus-carousel-text">
                        "{testimony.text}"
                      </p>
                      <p className="aboutus-carousel-name">
                        - {testimony.name}
                      </p>
                    </div>
                  </Col>
                </Row>
              </div>
            ))}
          </Carousel>
        </div>

        <div className="carousel-buttons">
          <Button shape="circle" icon={<LeftOutlined />} onClick={prev} />

          <Button shape="circle" icon={<RightOutlined />} onClick={next} />
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
