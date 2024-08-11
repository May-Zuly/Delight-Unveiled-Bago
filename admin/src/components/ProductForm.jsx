import { Button, Form, Input, Select, Upload, message } from "antd";
import React, { useEffect, useState } from "react";

import ImgCrop from "antd-img-crop";
import { PlusOutlined } from "@ant-design/icons";
import { userData } from "../store";

import { useRecoilValue } from "recoil";

export default function ProductForm({
  labelCol,
  wrapperCol,
  onFinish,
  btnText = "create",
  intitalData,
}) {
  const loginUser = useRecoilValue(userData);
  const [townshipList, setTownshipList] = useState([]);
  const optionList = [
    { label: "Furniture", value: "furniture" },
    { label: "Food", value: "food" },
  ];
  const districtList = [
    { label: "Bago (East)", value: "bagoEast" },
    { label: "Bago (West)", value: "bagoWest" },
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
      township: values.township,
      district: values.district,
      seller: loginUser.id,
    };
    const formData = new FormData();
    if (fileList.length > 0) {
      formData.append("files.image", fileList[0].originFileObj, data.name);
    }
    formData.append("data", JSON.stringify(data));
    onFinish(formData, values.id);
  };

  const handleDistrictChange = async (value) => {
    form.setFieldValue("township", null);
    if (value === "bagoEast") {
      await setTownshipList([
        { label: "Bago", value: "Bago" },
        { label: "Taungoo", value: "Taungoo" },
        { label: "Shwegyin", value: "Shwegyin" },
        { label: "Nyaunglebin", value: "Nyaunglebin" },
        { label: "Daik-U", value: "Daik-U" },
      ]);
    }
    if (value === "bagoWest") {
      await setTownshipList([
        { label: "Paukkaung", value: "Paukkaung" },
        { label: "Pyay", value: "Pyay" },
        { label: "Shwedaung", value: "Shwedaung" },
        { label: "Padaung", value: "Padaung" },
        { label: "Nattalin", value: "Nattalin" },
        { label: "Zigon", value: "Zigon" },
        { label: "Thegon", value: "Thegon" },
        { label: "Paungde", value: "Paungde" },
        { label: "Gyobingauk", value: "Gyobingauk" },
        { label: "Okpho", value: "Okpho" },
        { label: "Minhla", value: "Minhla" },
        { label: "Monyo", value: "Monyo" },
        { label: "Letpandan", value: "Letpandan" },
        { label: "Tharrawaddy", value: "Tharrawaddy" },
      ]);
    }
  };

  return (
    <Form
      form={form}
      initialValues={intitalData}
      labelCol={{ span: labelCol }}
      wrapperCol={{ span: wrapperCol }}
      layout="horizontal"
      onFinish={handleSubmit}
      style={{
        background: "#e1e1e1",
        padding: "2rem",
        borderRadius: "6px",
        paddingTop: "4rem",
      }}
    >
      <Form.Item name="id" hidden>
        <Input />
      </Form.Item>
      {intitalData.image && (
        <Form.Item label="Old Image">{intitalData.image}</Form.Item>
      )}
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
        name="district"
        label="District"
        rules={[{ required: true, message: "Please Select ..." }]}
      >
        <Select
          placeholder="Please Select ..."
          options={districtList}
          onChange={handleDistrictChange}
        />
      </Form.Item>
      <Form.Item
        name="township"
        label="Township"
        rules={[{ required: true, message: "Please Select ..." }]}
      >
        <Select placeholder="Please Select ..." options={townshipList} />
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
