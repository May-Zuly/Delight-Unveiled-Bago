import React from 'react';
import { Card, Col, Row } from 'antd';
import './BlogPage.css';

// Example videos stored in the public folder
const blogData = [
  {
    title: 'Exploring the Bago Region - Part 1',
    description: 'Join us as we explore the scenic beauty of the Bago Region. In this video, we cover the breathtaking landscapes and cultural heritage sites.',
    videoUrl: '/videos/blog1.mp4',
  },
  {
    title: 'Bago Region Cuisine',
    description: 'Discover the unique and delicious cuisine of the Bago Region. This video showcases some of the best local dishes you must try.',
    videoUrl: '/videos/blog1.mp4',
  },
  {
    title: 'Adventure Activities in Bago',
    description: 'Get ready for some adrenaline-pumping adventure activities in the Bago Region. This video highlights the top activities for thrill-seekers.',
    videoUrl: '/videos/blog1.mp4',
  },
];

const BlogPage = () => {
  return (
    <div className="blog-page">
      <h1 className="blog-title">Delight Unveiled: Bago Region</h1>
      <Row gutter={[16, 16]}>
        {blogData.map((blog, index) => (
          <Col xs={24} sm={24} md={12} lg={8} key={index}>
            <Card
              hoverable
              cover={
                <video className="blog-video" controls>
                  <source src={blog.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              }
            >
              <Card.Meta title={blog.title} description={blog.description} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BlogPage;
