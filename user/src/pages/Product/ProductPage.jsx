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
import ProductSearch from "./ProductSearch";

export default function ProductPage() {
  const [searchData, setSearchData] = useState({
    minPrice: "",
    maxPrice: "",
    category: null,
    itemName: "",
  });
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const pageSize = 8;

  const createSearchQuery = (search) => {
    const payload = {};
    if (search.category) {
      payload.type = {
        $eq: search.category,
      };
    }
    if (search.itemName) {
      payload.name = {
        $containsi: search.itemName,
      };
    }
    if (search.minPrice && search.maxPrice) {
      payload.price = {
        $between: [Number(search.minPrice), Number(search.maxPrice)],
      };
    } else if (search.minPrice) {
      payload.price = {
        $gte: Number(search.minPrice),
      };
    } else if (search.maxPrice) {
      payload.price = {
        $lte: Number(search.maxPrice),
      };
    }
    return payload;
  };

  // Function to fetch products
  const fetchProducts = async (page, search = null) => {
    try {
      const filters = search ? createSearchQuery(search) : {};
      const query = qs.stringify(
        {
          filters,
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
    fetchProducts(currentPage, searchData).then((res) => {
      if (res) {
        setItems(res.data);
        setTotalItems(res.meta.pagination.total); // Ensure correct total items
      }
    });
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const searchProduct = async (search) => {
    setCurrentPage(1);
    setSearchData(search);
    try {
      const res = await fetchProducts(currentPage, search);
      if (res) {
        setItems(res.data);
        setTotalItems(res.meta.pagination.total); // Ensure correct total items
      }
    } catch (error) {
      console.error("Error in search : ", error);
    }
  };

  return (
    <div style={{ width: "95%", margin: "100px auto" }}>
      <ProductSearch
        searchProduct={searchProduct}
        searchData={searchData}
        setSearchData={setSearchData}
      />
      <Row gutter={[16, 16]} style={{ marginTop: "30px" }}>
        {items.map((product) => (
          <Col
            className="product-card"
            key={product.id}
            xs={24}
            sm={12}
            md={8}
            lg={6} // Mobile (1 column), Tablet (2 columns), Desktop (4 columns)
          >
            {currentPage === 1 && (
              <Badge.Ribbon
                className="itemCardBadge"
                text={"new"}
                color="#aa620f"
              ></Badge.Ribbon>
            )}
            <Card
              hoverable
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
                  <>
                    <Typography.Paragraph>
                      Name: {product.attributes.name}
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                      Price: Ks {product.attributes.price}
                    </Typography.Paragraph>
                  </>
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
