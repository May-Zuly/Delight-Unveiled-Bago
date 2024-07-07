import { Card } from "antd";
import UserForm from "../../components/UserForm";
import api from "../../api/helper";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CreateUser() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState("");
  const onFinish = async (data) => {
    try {
      const userData = { ...data };
      userData.role = 1;
      const res = await api.post(`users/`, userData, {
        headers: { requireToken: true },
      });
      if (res.data) {
        navigate("/user");
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="title">Create User</h2>
      <UserForm
        labelCol={2}
        wrapperCol={10}
        onFinish={onFinish}
        isCreate={true}
        intitalData={{ remember: true }}
      />
    </>
  );
}
