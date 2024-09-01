import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Rate, List, Form, Input, Button, Image, message } from "antd";
import { Comment } from "@ant-design/compatible";
import "./ProductDetail.css";
import { ShoppingCartOutlined } from "@ant-design/icons";
import qs from "qs";
import api from "../../api/helper";
import { format } from "date-fns";
import { cart } from "../../store";
import { useRecoilState } from "recoil";

const { TextArea } = Input;

const ProductDetailPage = () => {
  const loginUser = JSON.parse(localStorage.getItem("loginUser"));
  const { id } = useParams();

  const [cartData, setCartData] = useRecoilState(cart);
  const [product, setProduct] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [productRate, setProductRate] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const query = qs.stringify(
        {
          populate: {
            image: true,
            ratings: {
              sort: ["createdAt:desc"],
              populate: {
                customer: true,
              },
            },
          },
        },
        {
          encodeValuesOnly: true, // prettify URL
        }
      );
      const res = await api.get(`products/${id}?${query}`, {
        headers: { requireToken: !!loginUser },
      });
      if (res.data.data?.attributes?.ratings) {
        setComments(res.data.data?.attributes?.ratings.data);
        const ratingData = res.data.data?.attributes?.ratings.data || 0;
        const totalRating = ratingData.length * 5;
        const getRating = ratingData.reduce((accumulator, current) => {
          return accumulator + current.attributes.rating;
        }, 0);
        const rating = (getRating / totalRating) * 5;
        await setProductRate(rating);
      }
      await setProduct(res.data.data);
    } catch (error) {
      message.error("Error fetching products: ");
    }
  };

  const handleSubmit = async () => {
    if (!newComment || !newRating)
      return message.error("Please select Rating and Comment"); // Ensure both comment and rating are provided

    if (!loginUser) return message.error("Please Login ...");
    const newComments = {
      data: {
        rating: newRating,
        product: id,
        customer: loginUser.user.id,
        comment: newComment,
      },
    };
    const res = await api.post("ratings", newComments, {
      headers: { requireToken: true },
    });
    if (res.data) {
      setNewComment("");
      setNewRating(0);
      message.success("Comment Success");
      fetchProducts();
    }
  };

  const addProductToCart = (product) => {
    setCartData((prevCartData) => {
      let cartList = prevCartData.map((item) => ({ ...item }));
      const productIndex = cartList.findIndex((d) => d.id === product.id);

      if (productIndex > -1) {
        if (cartList[productIndex].quantity < product.attributes.stock) {
          cartList[productIndex] = {
            ...cartList[productIndex],
            quantity: cartList[productIndex].quantity + 1,
          };
        } else {
          message.error("Out Of Stock");
        }
      } else {
        const newProduct = { ...product, quantity: 1 };
        cartList.push(newProduct);
      }

      return cartList;
    });
  };

  const getQuantity = (id) => {
    const data = cartData.find((d) => d.id === id);
    return data?.quantity || "";
  };
  return (
    <div className="product-detail-container">
      {product && product.attributes && (
        <Card
          title={product?.attributes?.name}
          cover={
            <Image
              className="cartImgDetail"
              alt="product"
              src={`http://localhost:1337${product?.attributes?.image?.data?.attributes?.url}`}
            />
          }
          actions={[
            <>
              <Rate value={productRate} className="product-rate-section" />
              <Button
                type="link"
                icon={
                  <div className="cartButton">
                    {getQuantity(product.id) ? (
                      <div
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          background: "rgb(170, 98, 15)",
                          color: "white",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginLeft: "8px",
                        }}
                      >
                        {getQuantity(product.id)}
                      </div>
                    ) : (
                      <Button
                        style={{ border: "none" }}
                        icon={<ShoppingCartOutlined />}
                      />
                    )}
                  </div>
                }
                onClick={() => addProductToCart(product)}
                disabled={product.attributes.stock === 0}
              >
                ဝယ်ယူရန်
              </Button>
            </>,
          ]}
        >
          <b>{product?.attributes?.price} MMK</b>
          <p>{product?.attributes?.description}</p>
        </Card>
      )}

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
                author={item.attributes.customer.data.attributes.username}
                // avatar={<Avatar src={item.avatar} shape="circle" />}
                content={
                  <>
                    <Rate disabled value={item.attributes.rating} />
                    <br />
                    {item.attributes.comment}
                  </>
                }
                datetime={format(item.attributes.updatedAt, "yyyy-MM-dd hh:mm")}
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
