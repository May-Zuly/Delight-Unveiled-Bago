import { Button, Form, Input, Select, Upload, message } from "antd";
import React, { useEffect, useState } from "react";

import ImgCrop from "antd-img-crop";
import { PlusOutlined } from "@ant-design/icons";

export default function ProductForm({
  labelCol,
  wrapperCol,
  onFinish,
  btnText = "create",
  intitalData,
}) {
  const optionList = [
    { label: "Furniture", value: "furniture" },
    { label: "Food", value: "food" },
  ];

  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    form.setFieldsValue(intitalData);
  }, [form, intitalData]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleSubmit = async (values) => {
    const data = {
      name: values.name,
      price: values.price,
      description: values.description,
      type: values.type,
      stock: values.stock,
    };
    const formData = new FormData();
    if (fileList.length > 0) {
      formData.append("files.image", fileList[0].originFileObj, data.name);
    }
    formData.append("data", JSON.stringify(data));
    onFinish(formData);
  };

  return (
    <Form
      form={form}
      initialValues={intitalData}
      labelCol={{ span: labelCol }}
      wrapperCol={{ span: wrapperCol }}
      layout="horizontal"
      onFinish={handleSubmit}
    >
      <Form.Item name="id" hidden>
        <Input />
      </Form.Item>
      <Form.Item label="Image" name="image" valuePropName="fileList">
        <ImgCrop rotationSlider>
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            maxCount={1} // Set maxCount to 1 to allow only one upload
          >
            {fileList.length < 1 && (
              <button style={{ border: 0, background: "none" }} type="button">
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </button>
            )}
          </Upload>
        </ImgCrop>
      </Form.Item>
      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input product name!",
          },
        ]}
      >
        <Input placeholder="name" />
      </Form.Item>
      <Form.Item
        name="type"
        label="Type"
        rules={[{ required: true, message: "Please Select ..." }]}
      >
        <Select placeholder="Please Select ..." options={optionList} />
      </Form.Item>
      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: "Please input price!" }]}
      >
        <Input type="number" placeholder="Price" />
      </Form.Item>
      <Form.Item
        label="Stock"
        name="stock"
        rules={[{ required: true, message: "Please input stock!" }]}
      >
        <Input type="number" placeholder="Stock" />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: "Please input Description!" }]}
      >
        <Input.TextArea placeholder="Description" />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: labelCol }}>
        <Button htmlType="submit" type="primary">
          {btnText}
        </Button>
      </Form.Item>
    </Form>
  );
}
