import { Button, Modal, Pagination, Space, Table } from "antd";
import { useEffect, useState } from "react";

import ProductForm from "../../components/ProductForm";
import api from "../../api/helper";
import { dateFormat } from "../../utils/constant";
import dayjs from "dayjs";
import qs from "qs";

export default function App() {
  const [visible, setVisible] = useState(false);
  const [updateData, setUpdateData] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState("");
  const [searchData, setSearchData] = useState({
    minPrice: "",
    maxPrice: "",
    category: null,
    itemName: "",
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

  const columns = [
    {
      title: "",
      dataIndex: "image",
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
          <Button onClick={() => onEditFun(record.id)}>Edit</Button>
          <Button danger onClick={() => confirm(record.id)}>
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
        headers: { requireToken: false },
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
        createdAt: item.attributes.createdAt,
        updatedAt: item.attributes.updatedAt,
      }));
      console.log(transformedArray, "tarad");
      let newData = { ...res.data, data: transformedArray };
      setData(newData);
      setTotalItems(res.meta.pagination.total);
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

  return (
    <>
      <Table columns={columns} dataSource={data.data} pagination={false} />
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
