import { Button, Modal, Space, Table, Tag, message } from "antd";
import { useEffect, useState } from "react";

import UserForm from "../../components/UserForm";
import api from "../../api/helper";
import { dateFormat } from "../../utils/constant";
import dayjs from "dayjs";

export default function App() {
  const [visible, setVisible] = useState(false);
  const [updateData, setUpdateData] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState("");

  const columns = [
    {
      title: "Name",
      dataIndex: "username",
      key: "username",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Type",
      key: "type",
      dataIndex: "type",
      render: (type) => (
        <>
          <Tag color="geekblue" key={type}>
            {type}
          </Tag>
        </>
      ),
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
    const editValue = data.find((item) => item.id === id);
    if (editValue) {
      setUpdateData({ ...editValue, date: dayjs(editValue.date, dateFormat) });
      setVisible(true);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("users", {
        headers: { requireToken: true },
      });
      if (res.data) {
        setData(res.data);
      }
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
    try {
      const res = await api.delete(`users/${id}`, {
        headers: { requireToken: true },
      });
      if (res.data) {
        fetchUsers();
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const onFinish = async (data) => {
    try {
      const res = await api.put(`users/${data.id}`, data, {
        headers: { requireToken: true },
      });
      if (res.data) {
        fetchUsers();
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
      <Table columns={columns} dataSource={data} />
      <Modal
        title="Edit User"
        open={visible}
        onCancel={() => onCloseFunc()}
        footer={null}
      >
        <UserForm
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
