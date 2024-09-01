import { Row, Col, Input, Select, Button } from "antd";

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
    const { minPrice, maxPrice, category, itemName, township } = searchData;
    return !minPrice && !maxPrice && !category && !itemName && !township;
  };

  const townshipList = [
    { label: "ပေါက်ခေါင်း", value: "Paukkaung" },
    { label: "ပြည်မြို့", value: "Pyay" },
    { label: "ရွှေတောင်မြို့", value: "Shwedaung" },
    { label: "ပန်းဒေါင်းမြို့", value: "Padaung" },
    { label: "နတ်တလင်းမြို့", value: "Nattalin" },
    { label: "ဇီးကုန်းမြို့", value: "Zigon" },
    { label: "သဲကုန်းမြို့", value: "Thegon" },
    { label: "ပေါင်းတည်မြို့", value: "Paungde" },
    { label: "ကြို့ပင်ကောက်မြို့", value: "Gyobingauk" },
    { label: "အုတ်ဖိုမြို့", value: "Okpho" },
    { label: "မင်းလှမြို့", value: "Minhla" },
    { label: "မိုးညိုမြို့", value: "Monyo" },
    { label: "လက်ပန်တန်းမြို့", value: "Letpandan" },
    { label: "သာယာဝတီမြို့", value: "Tharrawaddy" },
    { label: "ပဲခူးမြို့", value: "Bago" },
    { label: "တောင်ငူမြို့", value: "Taungoo" },
    { label: "ရွှေကျင်မြို့", value: "Shwegyin" },
    { label: "ညောင်လေးပင်မြို့", value: "Nyaunglebin" },
    { label: "ဒိုက်ဦးမြို့", value: "Daik-U" },
  ];

  return (
    <>
      <Row gutter={[16, 16]}>
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
            <Option value="food">စားသောက်ကုန်များ</Option>
            <Option value="clothes">အဝတ်အထည်များ</Option>
            <Option value="artifacts">လူသုံးကုန်ပစ္စည်းများ</Option>
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
        <Col>
          <Button
            type="primary"
            disabled={btnDisabled()}
            onClick={() => searchProduct(searchData)}
            style={{
              backgroundColor: "#995f20",
              borderColor: "#aa620f",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#dda15e";
              e.currentTarget.style.borderColor = "#995f20";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#995f20";
              e.currentTarget.style.borderColor = "#aa620f";
            }}
          >
            Search
          </Button>
        </Col>
      </Row>
    </>
  );
}
