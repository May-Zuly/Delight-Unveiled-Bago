import { Button, Modal, Pagination, Space, Table } from "antd";
import { useEffect, useState } from "react";

import ProductForm from "../../components/ProductForm";
import ProductSearch from "../../components/ProductSearch";
import api from "../../api/helper";
import { dateFormat } from "../../utils/constant";
import dayjs from "dayjs";
import qs from "qs";
import { userData } from "../../store";

import { useRecoilValue } from "recoil";

export default function App() {
  const [visible, setVisible] = useState(false);
  const [updateData, setUpdateData] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState("");
  const loginUser = useRecoilValue(userData);
  const [searchData, setSearchData] = useState({
    minPrice: "",
    maxPrice: "",
    category: null,
    itemName: "",
    stock: "",
    township: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const pageSize = 10;

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
    if (search.stock) {
      payload.stock = {
        $lte: search.stock,
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
    if (loginUser.type === "producer") payload.seller = loginUser.id;
    return payload;
  };

  const columns = [
    {
      title: "",
      dataIndex: "image",
      width:100,
      key: "image",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Descrption",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "District",
      dataIndex: "district",
      key: "district",
    },
    {
      title: "Township",
      dataIndex: "township",
      key: "township",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => <span>{dayjs(createdAt).format(dateFormat)}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => onEditFun(record.id)}>Edit</Button>
          <Button type="primary" danger onClick={() => confirm(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const onEditFun = (id) => {
    const editValue = data.data.find((item) => item.id === id);
    if (editValue) {
      setUpdateData({ ...editValue, date: dayjs(editValue.date, dateFormat) });
      setVisible(true);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const filters = createSearchQuery(searchData);
      const query = qs.stringify(
        {
          filters,
          sort: ["createdAt:desc"],
          populate: {
            image: true,
            seller: true,
          },
          pagination: {
            page: currentPage,
            pageSize: pageSize,
          },
        },
        {
          encodeValuesOnly: true,
        }
      );
      const res = await api.get(`products?${query}`, {
        headers: { requireToken: true },
      });
      const transformedArray = res.data.data.map((item, index) => ({
        key: index,
        id: item.id,
        image: item.attributes.image.data ? (
          <img
            width="100px"
            src={`http://localhost:1337${item.attributes.image.data.attributes.url}`}
          />
        ) : (
          ""
        ),
        name: item.attributes.name,
        type: item.attributes.type,
        description: item.attributes.description,
        price: item.attributes.price,
        stock: item.attributes.stock,
        township: item.attributes.township,
        district: item.attributes.district,
        createdAt: item.attributes.createdAt,
        updatedAt: item.attributes.updatedAt,
      }));
      let newData = { ...res.data, data: transformedArray };
      setData(newData);
      setTotalItems(res.data.meta.pagination.total);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const confirm = (id) => {
    Modal.confirm({
      title: "Delete Confirmation",
      content: "Are you sure want to delete!!",
      okText: "Yes",
      cancelText: "Cancel",
      okButtonProps: {
        danger: true,
      },
      cancelButtonProps: {
        danger: true,
      },
      onOk: () => {
        onDeleteFunc(id);
      },
    });
  };

  const onDeleteFunc = async (id) => {
    setLoading(true);
    try {
      const res = await api.delete(`products/${id}`, {
        headers: { requireToken: true },
      });
      if (res.data) {
        fetchProducts();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const onFinish = async (data, id) => {
    setLoading(true);
    try {
      const res = await api.put(`products/${id}`, data, {
        headers: { requireToken: true },
      });
      if (res.data) {
        fetchProducts();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
    onCloseFunc();
  };

  const onCloseFunc = () => {
    setUpdateData({});
    setVisible(false);
  };
  const searchProduct = async (search) => {
    setCurrentPage(1);
    setSearchData(search);
    try {
      const res = await fetchProducts();
      if (res) {
        setItems(res.data);
        setTotalItems(res.meta.pagination.total); // Ensure correct total items
      }
    } catch (error) {
      console.error("Error in search : ", error);
    }
  };
  return (
    <>
      <ProductSearch
        searchProduct={searchProduct}
        searchData={searchData}
        setSearchData={setSearchData}
      />
      <Table columns={columns} dataSource={data.data} pagination={false} scroll={{ x: 1200 }} />
      <Pagination
        showSizeChanger={false}
        current={currentPage}
        pageSize={pageSize}
        total={totalItems}
        onChange={(page) => setCurrentPage(page)}
      />
      <Modal
        title="Edit Product"
        open={visible}
        onCancel={() => onCloseFunc()}
        footer={null}
      >
        <ProductForm
          labelCol={6}
          wrapperCol={18}
          onFinish={onFinish}
          btnText="Edit"
          intitalData={updateData}
        />
      </Modal>
    </>
  );
}
