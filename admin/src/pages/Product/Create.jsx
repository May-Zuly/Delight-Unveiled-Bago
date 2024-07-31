import ProductForm from "../../components/ProductForm";
import UserForm from "../../components/UserForm";
import api from "../../api/helper";
import { useState } from "react";

export default function CreateUser() {
  const [loading, setLoading] = useState("");
  const onFinish = async (data) => {
    try {
      const userData = { ...data };
      userData.role = 1;
      const res = await api.post(`products/`, userData, {
        headers: { requireToken: true },
      });
      if (res.data) {
        window.location.href = "/product";
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="title">Create Product</h2>
      <ProductForm
        labelCol={4}
        wrapperCol={10}
        onFinish={onFinish}
        intitalData={{ remember: true }}
      />
    </>
  );
}
