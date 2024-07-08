import { Col, Modal, Row } from "antd";

import ChangePassword from "../components/ChangePassword";
import { dateFormat } from "../utils/constant";
import dayjs from "dayjs";
import { useRecoilValue } from "recoil";
import { useState } from "react";
import { userData } from "../store";

export default function App() {
  const user = useRecoilValue(userData);
  const [showChangePassword, setShowChangePassword] = useState(false);

  return (
    <>
      <h2 className="title">Profile</h2>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={3}>
          <label>User Name : </label>
        </Col>
        <Col xs={24} md={21}>
          <label>{user.username}</label>
        </Col>
        <Col xs={24} md={3}>
          <label>Email : </label>
        </Col>
        <Col xs={24} md={21}>
          <label>{user.email}</label>
        </Col>
        <Col xs={24} md={3}>
          <label>Address : </label>
        </Col>
        <Col xs={24} md={21}>
          <label>{user.address}</label>
        </Col>
        <Col xs={24} md={3}>
          <label>Phone Number : </label>
        </Col>
        <Col xs={24} md={21}>
          <label>{user.phoneNumber}</label>
        </Col>
        <Col xs={24} md={3}>
          <label>Type : </label>
        </Col>
        <Col xs={24} md={21}>
          <label>{user.type}</label>
        </Col>
        <Col xs={24} md={3}>
          <label>Created Date : </label>
        </Col>
        <Col xs={24} md={21}>
          <label>{dayjs(user.createdDate).format(dateFormat)}</label>
        </Col>
      </Row>
      <br />
      <br />
      <a href="#" onClick={() => setShowChangePassword(true)}>
        Change Password
      </a>
      <Modal
        title="Change Password"
        open={showChangePassword}
        onCancel={() => setShowChangePassword(false)}
        footer={null}
      >
        <ChangePassword />
      </Modal>
    </>
  );
}
