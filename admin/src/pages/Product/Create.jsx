import ProductForm from "../../components/ProductForm";
import api from "../../api/helper";
import { message } from "antd";

export default function CreateUser() {
  const onFinish = async (sendData) => {
    // Submit to API
    try {
      const response = await api.post("products", sendData, {
        headers: {
          requireToken: true,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        message.success("Product created successfully!");
        window.location.href = "/product";
      } else {
        message.error("Failed to create product!");
      }
    } catch (error) {
      message.error("Failed to create product!");
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
