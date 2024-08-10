import "./ProductPage.css";

import {
  Badge,
  Button,
  Card,
  Col,
  Image,
  Pagination,
  Row,
  Typography,
} from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

import ProductSearch from "./ProductSearch";
import api from "../../api/helper";
import { cart } from "../../store";
import qs from "qs";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

export default function ProductPage() {
  const navigate = useNavigate();
  const [cartData, setCartData] = useRecoilState(cart);
  const [searchData, setSearchData] = useState({
    minPrice: "",
    maxPrice: "",
    category: null,
    itemName: "",
    township: null,
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
    if (search.township) {
      payload.township = {
        $eq: search.township,
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

  const addProductToCart = (product) => {
    setCartData((prevCartData) => {
      let cartList = prevCartData.map((item) => ({ ...item }));
      const productIndex = cartList.findIndex((d) => d.id === product.id);

      if (productIndex > -1) {
        cartList[productIndex] = {
          ...cartList[productIndex],
          quantity: cartList[productIndex].quantity + 1,
        };
      } else {
        const newProduct = { ...product, quantity: 1 };
        cartList.push(newProduct);
      }

      return cartList;
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getQuantity = (id) => {
    const data = cartData.find((d) => d.id === id);
    return data?.quantity || "";
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
            <div className="itemCardWrapper">
              {product.attributes.stock === 0 && (
                <div className="itemCardOverlay">Out of Stock</div>
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
                    preview={product.attributes.stock > 0}
                  />
                }
                actions={[
                  <>
                    {/* <Rate key={product.id} value={product.attributes.rating} />, */}
                    <Button
                      type="link"
                      icon={<EyeOutlined />}
                      onClick={() => {
                        product.attributes.stock > 0 &&
                          navigate(`/product/${product.id}`);
                      }}
                    >
                      View detail
                    </Button>
                    <Button
                      key={product.id}
                      type="link"
                      onClick={() => addProductToCart(product)}
                      disabled={product.attributes.stock === 0} // Disable button if out of stock
                      icon={<ShoppingCartOutlined />}
                    >
                      Add to Cart{" "}
                      {getQuantity(product.id) && (
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
                      )}
                    </Button>
                    ,
                  </>,
                ]}
              >
                <Card.Meta
                  title={
                    <>
                      <Typography.Paragraph>
                        Name: {product.attributes.name}
                      </Typography.Paragraph>
                      <Typography.Paragraph>
                        Price: MMK {product.attributes.price}
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
            </div>
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
}
