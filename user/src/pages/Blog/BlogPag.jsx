import "./BlogPage.css";

import { Card, Col, Image, Row } from "antd";

import { useEffect } from "react";

// Example videos stored in the public folder
const blogData = [
  {
    title: "A glimpse of the jam industry in Pyay",
    description:
      "Various fruit jams and food products industry is a traditional business that uses the best natural fruits to produce and sell food products that provide health and full taste.",
    imageUrl: "/src/assets/images/jam1.jpg",
    date: "July 22, 2024",
  },
  {
    title: "Traditional Burmese wooden carvings from Minhla ",
    description:
      "The Burmese traditional wood carving industry is crucial to cultural and artistic heritage, showcasing exceptional sculpting skills and time-intensive processes to create beautiful, natural sculptures.",
    imageUrl: "/src/assets/images/panpu1.jpg",
    date: "June 30, 2024",
  },
  {
    title: "A profitable corn market in PaungDe",
    description:
      "The local farmers in PaungDe Township have been working on maize cultivation all year round in order to export it to various areas and for the corn stall market that is developing along the Yangon-Pyay highway",
    imageUrl: "/src/assets/images/corn.jpg",
    date: "June 22, 2024",
  },
];

const BlogPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="blog-page">
      <h1 className="blog-title">Our Blogs</h1>
      <Row gutter={[16, 16]}>
        {blogData.map((blog, index) => (
          <Col xs={24} sm={24} md={12} lg={8} key={index}>
            <a href={`/blog/${index}`}>
              <Card
                hoverable
                cover={
                  <Image
                    alt={blog.title}
                    src={blog.imageUrl}
                    className="blog-image" // Updated to image element
                  />
                }
              >
                <Card.Meta
                  title={
                    <div>
                      {blog.title}
                      <div className="blog-meta-info">
                        <time style={{fontStyle:'italic',fontSize:'0.75rem'}}>{blog.date}</time>
                        <span style={{fontStyle:'italic',fontSize:'0.75rem'}}> by May Zuly Moe</span>
                      </div>
                    </div>
                  }
                  description={blog.description}
                />
              </Card>
            </a>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BlogPage;
