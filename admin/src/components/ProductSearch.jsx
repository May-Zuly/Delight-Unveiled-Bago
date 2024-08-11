import { Row, Col, Input, Select, Button } from "antd";
import {SearchOutlined} from "@ant-design/icons";

const { Option } = Select;

export default function ProductSearch({
  searchData,
  setSearchData,
  searchProduct,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDropdownChange = (value, name) => {
    setSearchData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const btnDisabled = () => {
    const { minPrice, maxPrice, category, itemName, township, stock } =
      searchData;
    return (
      !minPrice && !maxPrice && !category && !itemName && !township && !stock
    );
  };

  const townshipList = [
    { label: "Paukkaung", value: "Paukkaung" },
    { label: "Pyay", value: "Pyay" },
    { label: "Shwedaung", value: "Shwedaung" },
    { label: "Padaung", value: "Padaung" },
    { label: "Nattalin", value: "Nattalin" },
    { label: "Zigon", value: "Zigon" },
    { label: "Thegon", value: "Thegon" },
    { label: "Paungde", value: "Paungde" },
    { label: "Gyobingauk", value: "Gyobingauk" },
    { label: "Okpho", value: "Okpho" },
    { label: "Minhla", value: "Minhla" },
    { label: "Monyo", value: "Monyo" },
    { label: "Letpandan", value: "Letpandan" },
    { label: "Tharrawaddy", value: "Tharrawaddy" },
    { label: "Bago", value: "Bago" },
    { label: "Taungoo", value: "Taungoo" },
    { label: "Shwegyin", value: "Shwegyin" },
    { label: "Nyaunglebin", value: "Nyaunglebin" },
    { label: "Daik-U", value: "Daik-U" },
  ];

  return (
    <>
      <Row
        gutter={[16, 16]}
        justify={"center"}
        style={{ background: "#9a5e0f", padding: "1rem", borderRadius: "4px" }}
      >
        <Col xs={24} sm={12} md={8} lg={4}>
          <Select
            showSearch
            optionFilterProp="children"
            allowClear
            placeholder="Search By Township"
            style={{ width: "100%" }}
            name="township"
            onChange={(value) => handleDropdownChange(value, "township")}
            value={searchData.township}
            options={townshipList}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Select
            showSearch
            optionFilterProp="children"
            allowClear
            placeholder="Search By Category"
            style={{ width: "100%" }}
            name="category"
            onChange={(value) => handleDropdownChange(value, "category")}
            value={searchData.category}
          >
            <Option value="food">Food</Option>
            <Option value="furniture">Furniture</Option>
          </Select>
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Input
            placeholder="Search By Name"
            name="itemName"
            value={searchData.itemName}
            onChange={handleChange}
          />
        </Col>
        {/* <Col xs={24} sm={12} md={8} lg={4}>
          <Input
            type="number"
            placeholder="Min Price"
            name="minPrice"
            value={searchData.minPrice}
            onChange={handleChange}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={4}>
          <Input
            type="number"
            placeholder="Max Price"
            name="maxPrice"
            value={searchData.maxPrice}
            onChange={handleChange}
          />
        </Col> */}
        <Col xs={24} sm={12} md={8} lg={4}>
          <Input
            type="number"
            placeholder="Stock"
            name="stock"
            value={searchData.stock}
            onChange={handleChange}
          />
        </Col>
        <Col>
        <Button type="primary" icon={<SearchOutlined />}>
        Search
        </Button>
          {/* <Button
            type="primary"
            disabled={btnDisabled()}
            onClick={() => searchProduct(searchData)}
            style={{
              backgroundColor: "#f1f1f1",
              borderColor: "#fff",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f1f1f1";
              e.currentTarget.style.borderColor = "#995f20";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#f1f1f1";
              e.currentTarget.style.borderColor = "#fff";
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-search"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </Button> */}
        </Col>
      </Row>
    </>
  );
}
