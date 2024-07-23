import { useEffect, useState } from "react";
import { addToCart, getAllProducts } from "../../api";
import {
  List,
  Card,
  Image,
  Typography,
  Badge,
  Rate,
  Button,
  message,
} from "antd";
import "./ProductPage.css";

export default function ProductPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getAllProducts().then((res) => {
      setItems(res.products);
    });
  }, []);

  return (
    <div>
      <List
        grid={{ column: 3 }}
        dataSource={items}
        renderItem={(product) => {
          return (
            <List.Item key={product.id}>
              <Badge.Ribbon
                className="itemCardBadge"
                text={`${product.discountPercentage}%`}
                color="#aa620f"
              >
                <Card
                  className="itemCard"
                  title={product.title}
                  cover={
                    <Image className="itemCardImage" src={product.thumbnail} />
                  }
                  actions={[
                    <Rate key={product.id} value={product.rating} />,
                    // <Button key={product.id} type="link">Add to Cart</Button>,
                    <AddToCartButton key={product.id} item={product} />,
                  ]}
                >
                  <Card.Meta
                    title={
                      <Typography.Paragraph>
                        Price: ${product.price}{" "}
                        <Typography.Text delete type="danger">
                          $
                          {parseFloat(
                            product.price +
                              (product.price * product.discountPercentage) / 100
                          ).toFixed(2)}
                        </Typography.Text>
                      </Typography.Paragraph>
                    }
                    description={
                      <Typography.Paragraph
                        ellipsis={{ rows: 2, expandable: true, symbol: "more" }}
                      >
                        {product.description}
                      </Typography.Paragraph>
                    }
                  />
                </Card>
              </Badge.Ribbon>
            </List.Item>
          );
        }}
      />
    </div>
  );

  function AddToCartButton({ item }) {
    const [loading, setLoading] = useState(false);

    const addProductToCart = () => {
      setLoading(true);
      addToCart(item.id).then((res) => {
        message.success(`${item.title} has been added to cart`);
        setLoading(false);
      });
    };

    return (
      <Button type="link" onClick={addProductToCart} loading={loading}>
        Add to Cart
      </Button>
    );
  }
}
