import { Button, Image, Modal, Pagination, Radio, Space, Table } from "antd";
import { useEffect, useState } from "react";

import ProductForm from "../../components/ProductForm";
import api from "../../api/helper";
import { dateFormat } from "../../utils/constant";
import dayjs from "dayjs";
import qs from "qs";
import { userData } from "../../store";

import { useRecoilValue } from "recoil";

export default function Order() {
  const loginUser = useRecoilValue(userData);
  const [visible, setVisible] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState("");
  const [orderDetail, setOrderDetail] = useState({});
  const [searchData, setSearchData] = useState({
    minPrice: "",
    maxPrice: "",
    category: null,
    itemName: "",
  });

  const columns = [
    {
      title: loginUser.type === "admin" && "Payment Screen Shoot",
      dataIndex: "image",
      render: (image) =>
        image &&
        loginUser.type === "admin" && (
          <Image src={`http://localhost:1337${image}`} width={100} />
        ),
    },
    {
      title: "Customer Name",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Customer Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Item Count",
      dataIndex: "item",
      render: (_, record) => <span>{record.purchases.length}</span>,
    },
    {
      title: "Total Amount",
      dataIndex: "total",
      key: "total",
      render: (_, record) => (
        <span>
          {record.purchases.reduce(
            (total, item) => total + item.product_price * item.quantity,
            0
          )}
        </span>
      ),
    },
    {
      title: "Payment Type",
      dataIndex: "payment",
      key: "payment",
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => <span>{dayjs(createdAt).format(dateFormat)}</span>,
    },
    {
      title: "Order Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Order Phone ",
      dataIndex: "order_phone",
      key: "order_phone",
    },
    {
      title: "Order Address",
      dataIndex: "order_address",
      key: "order_address",
    },
    {
      title: "Action",
      key: "action",
      // fixed: "right",
      // width: 200,
      render: (record) => (
        <Space size="middle">
          {loginUser.type === "admin" && (
            <Button
              onClick={() => {
                onChangeStatus(record.id);
              }}
            >
              Change Status
            </Button>
          )}
          <Button type="primary" onClick={() => onDetailFunc(record.id)}>
            Detail
          </Button>
        </Space>
      ),
    },
  ];

  const onDetailFunc = async (id) => {
    setLoading(true);
    try {
      let query = "";
      if (loginUser.type === "producer") query = `seller_id=${loginUser.id}`;
      const res = await api.get(`order/detail/${id}?${query}`, {
        headers: { requireToken: true },
      });
      setOrderDetail(res.data);
      setVisible(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      let query = "";
      if (loginUser.type === "producer") query = `seller_id=${loginUser.id}`;
      const res = await api.get(`order/list?${query}`, {
        headers: { requireToken: true },
      });
      setData(res.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const detailColumn = [
    {
      title: "Product Image",
      dataIndex: "product_image",
      render: (product_image) => (
        <Image src={`http://localhost:1337${product_image}`} width={100} />
      ),
    },
    {
      title: "Product Name",
      dataIndex: "product_name",
      key: "product_name",
    },
    {
      title: "Descriptionr",
      dataIndex: "product_description",
      key: "product_description",
    },
    {
      title: "Price",
      dataIndex: "product_price",
      key: "product_price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Sub Total",
      dataIndex: "sub_total",
      render: (_, record) => (
        <span>{record.product_price * record.quantity}</span>
      ),
    },
  ];

  const onChangeStatus = async (id) => {
    setLoading(true);
    try {
      const res = await api.get(`order/detail/${id}`, {
        headers: { requireToken: true },
      });
      setValue(res.data.status);
      setOrderDetail(res.data);
      setStatusModal(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const [value, setValue] = useState(1);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onStatusChangeFunc = async () => {
    setLoading(true);
    try {
      await api.put(
        `orders/${orderDetail.id}`,
        { data: { status: value } },
        {
          headers: { requireToken: true },
        }
      );
      setStatusModal(false);
      setLoading(false);
      fetchOrders();
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ x: 1000, y: 450 }}
      />
      <Modal
        width={1000}
        title="Order Detail"
        open={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        cancelButtonProps={{ style: { display: "none" } }}
      >
        <Table
          columns={detailColumn}
          dataSource={orderDetail.purchases}
          pagination={false}
          scroll={{ x: 800, y: 450 }}
        />
      </Modal>
      <Modal
        title="Change Status"
        open={statusModal}
        onCancel={() => setStatusModal(false)}
        closeIcon={true}
        onOk={() => onStatusChangeFunc()}
      >
        <Radio.Group onChange={onChange} value={value}>
          <Space direction="vertical">
            <Radio value="order">Order</Radio>
            <Radio value="delivering">Delivering</Radio>
            <Radio value="delivered">Completed</Radio>
            <Radio value="cancelled">Cancelled</Radio>
          </Space>
        </Radio.Group>
      </Modal>
    </>
  );
}
