import { useEffect, useState } from "react";
import {
  Card,
  Image,
  Typography,
  Badge,
  Rate,
  Button,
  message,
  Row,
  Col,
  Pagination,
} from "antd";
import "./ProductPage.css";
import api from "../../api/helper";
import qs from "qs";

export default function ProductPage() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const pageSize = 8;

  // Function to fetch products
  const fetchProducts = async (page) => {
    try {
      const query = qs.stringify(
        {
          // sorting
          sort: ["createdAt:desc"],
          // Get data from relation
          populate: {
            image: true,
          },
          // pagination
          pagination: {
            page: page,
            pageSize: pageSize,
          },
        },
        {
          encodeValuesOnly: true, // prettify URL
        }
      );
      const res = await api.get(`products?${query}`, {
        headers: { requireToken: false },
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching products: ", error);
      return null;
    }
  };

  useEffect(() => {
    // Fetch products when component mounts and when currentPage changes
    fetchProducts(currentPage).then((res) => {
      if (res) {
        setItems(res.data);
        setTotalItems(res.meta.pagination.total); // Ensure correct total items
      }
    });
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div style={{ width: "95%", margin: "100px auto" }}>
      <Row gutter={[16, 16]}>
        {items.map((product) => (
          <Col
            className="product-card"
            key={product.id}
            xs={24}
            sm={12}
            md={8}
            lg={6} // Mobile (1 column), Tablet (2 columns), Desktop (4 columns)
          >
            <Badge.Ribbon
              className="itemCardBadge"
              text={"new"}
              color="#aa620f"
            >
              <Card
                className="itemCard"
                title={product.attributes.title}
                cover={
                  <Image
                    className="itemCardImage"
                    src={`http://localhost:1337${product.attributes.image.data.attributes.url}`}
                    alt={product.attributes.title}
                  />
                }
                actions={[
                  <Rate key={product.id} value={product.attributes.rating} />,
                  <AddToCartButton key={product.id} item={product} />,
                ]}
              >
                <Card.Meta
                  title={
                    <Typography.Paragraph>
                      Price: ${product.attributes.price}
                    </Typography.Paragraph>
                  }
                  description={
                    <Typography.Paragraph
                      ellipsis={{ rows: 2, expandable: true, symbol: "more" }}
                    >
                      {product.attributes.description}
                    </Typography.Paragraph>
                  }
                />
              </Card>
            </Badge.Ribbon>
          </Col>
        ))}
      </Row>
      <div className="paginationContainer">
        <Pagination
          showSizeChanger={false}
          current={currentPage}
          pageSize={pageSize}
          total={totalItems}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );

  function AddToCartButton({ item }) {
    const [loading, setLoading] = useState(false);

    const addProductToCart = () => {
      setLoading(true);
      addToCart(item.id)
        .then(() => {
          message.success(`${item.attributes.title} has been added to cart`);
          setLoading(false);
        })
        .catch(() => {
          message.error("Failed to add item to cart");
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
