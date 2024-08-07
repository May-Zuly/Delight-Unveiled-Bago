import React, { useState } from "react";
import { Card, Rate, List, Form, Input, Button, Avatar,Image } from "antd";
import { Comment } from "@ant-design/compatible";
import "./ProductDetail.css";
import { ShoppingCartOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const ProductDetailPage = () => {
  const [comments, setComments] = useState([
    {
      author: "John Doe",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      content: <p>This product is amazing!</p>,
      datetime: "2024-08-01",
    },
    {
      author: "Jane Smith",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      content: <p>Good quality and fast delivery.</p>,
      datetime: "2024-08-02",
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);

  const handleSubmit = () => {
    if (!newComment) return;

    const newComments = [
      ...comments,
      {
        author: "New User",
        avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
        content: <p>{newComment}</p>,
        datetime: new Date().toLocaleDateString(),
      },
    ];

    setComments(newComments);
    setNewComment("");
    setNewRating(0);
  };

  return (
    <div className="product-detail-container">
      <Card
        title="Product Name"
        cover={<Image className="cartImgDetail" alt="product" src="/src/assets/images/grocery6.jpg" />}
        actions={[
          <Rate disabled defaultValue={4.5} />,
          <Button type="link" icon={<ShoppingCartOutlined />}>
            Add to Cart
          </Button>,
        ]}
      >
        <p>Product description goes here. This is a great product.</p>
      </Card>

      <div className="comments-section">
        <h2>User Ratings & Comments</h2>
        <List
          className="comment-list"
          header={`${comments.length} replies`}
          itemLayout="horizontal"
          dataSource={comments}
          renderItem={(item) => (
            <li>
              <Comment
                author={item.author}
                avatar={<Avatar src={item.avatar} shape="circle" />}
                content={item.content}
                datetime={item.datetime}
              />
            </li>
          )}
        />
      </div>

      <div className="comment-form-section">
        <h2>Leave a Comment</h2>
        <Form>
          <Form.Item>
            <Rate onChange={(value) => setNewRating(value)} value={newRating} />
          </Form.Item>
          <Form.Item>
            <TextArea
              rows={4}
              onChange={(e) => setNewComment(e.target.value)}
              value={newComment}
            />
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              loading={false}
              onClick={handleSubmit}
              type="primary"
            >
              Add Comment
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ProductDetailPage;
