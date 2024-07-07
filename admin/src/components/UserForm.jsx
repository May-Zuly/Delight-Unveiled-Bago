import { Button, DatePicker, Form, Input, Select } from "antd";

import { useEffect } from "react";

export default function UserForm({
  labelCol,
  wrapperCol,
  onFinish,
  btnText = "create",
  intitalData,
  isCreate = false,
}) {
  const optionList = [
    { label: "Admin", value: "admin" },
    { label: "Producer", value: "producer" },
    { label: "Customer", value: "customer" },
  ];
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(intitalData);
  }, [form, intitalData]);
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
      <Form.Item
        label="User Name"
        name="username"
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your Email!" }]}
      >
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item
        label="Address"
        name="address"
        rules={[{ required: true, message: "Please input your address!" }]}
      >
        <Input placeholder="Address" />
      </Form.Item>
      <Form.Item
        label="Phone Number"
        name="phoneNumber"
        rules={[{ required: true, message: "Please input your Phone Number!" }]}
      >
        <Input placeholder="Phone Number" />
      </Form.Item>
      <Form.Item
        name="type"
        label="Select"
        rules={[{ required: true, message: "Please Select ..." }]}
      >
        <Select placeholder="Please Select ..." options={optionList} />
      </Form.Item>
      {isCreate && (
        <>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input placeholder="Password" />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please input your Confirm Password!",
              },
            ]}
          >
            <Input placeholder="Confirm Passwordx" />
          </Form.Item>
        </>
      )}
      <Form.Item wrapperCol={{ offset: labelCol }}>
        <Button htmlType="submit" type="primary">
          {btnText}
        </Button>
      </Form.Item>
    </Form>
  );
}
