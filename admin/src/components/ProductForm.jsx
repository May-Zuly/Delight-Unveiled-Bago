import { Button, Form, Input, Select } from "antd";
import React, { useState } from "react";

import ImgCrop from "antd-img-crop";
import { Upload } from "antd";
import { useEffect } from "react";

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
  useEffect(() => {
    form.setFieldsValue(intitalData);
  }, [form, intitalData]);

  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return (
    <Form
      form={form}
      initialValues={intitalData}
      labelCol={{ span: labelCol }}
      wrapperCol={{ span: wrapperCol }}
      layout="horizontal"
      onFinish={onFinish}
    >
      <Form.Item name="id" hidden>
        <Input />
      </Form.Item>
      <Form.Item label="Image" name="image">
        <ImgCrop rotationSlider>
          <Upload
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            maxCount={1} // Set maxCount to 1 to allow only one upload
          >
            {fileList.length < 1 && "+ Upload"}
          </Upload>
        </ImgCrop>
      </Form.Item>
      <Form.Item
        label="Name"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input product name!",
          },
        ]}
      >
        <Input placeholder="Username" />
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
        <Input placeholder="Price" />
      </Form.Item>
      <Form.Item
        label="Stock"
        name="stock"
        rules={[{ required: true, message: "Please input stock!" }]}
      >
        <Input placeholder="Stock" />
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
