import "./Profile.css"; // Import the CSS file

import { Button, Card, Col, Modal, Row } from "antd";

import ChangePassword from "../components/ChangePassword";
import { dateFormat } from "../utils/constant";
import dayjs from "dayjs";
import { useRecoilValue } from "recoil";
import { useState } from "react";
import { userData } from "../store";

export default function Profile() {
  const user = useRecoilValue(userData);
  const [showChangePassword, setShowChangePassword] = useState(false);

  return (
    <div>
      <Row>
        <Col xs={24} md={12}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <strong>User Name:</strong>
            </Col>
            <Col xs={24} md={16}>
              <span>{user.username}</span>
            </Col>

            <Col xs={24} md={8}>
              <strong>Email:</strong>
            </Col>
            <Col xs={24} md={16}>
              <span>{user.email}</span>
            </Col>

            <Col xs={24} md={8}>
              <strong>Address:</strong>
            </Col>
            <Col xs={24} md={16}>
              <span>{user.address}</span>
            </Col>

            <Col xs={24} md={8}>
              <strong>Phone Number:</strong>
            </Col>
            <Col xs={24} md={16}>
              <span>{user.phoneNumber}</span>
            </Col>

            <Col xs={24} md={8}>
              <strong>Type:</strong>
            </Col>
            <Col xs={24} md={16}>
              <span>{user.type}</span>
            </Col>

            <Col xs={24} md={8}>
              <strong>Created Date:</strong>
            </Col>
            <Col xs={24} md={16}>
              <span>{dayjs(user.createdDate).format(dateFormat)}</span>
            </Col>
          </Row>
          <div className="change-password-profile-container">
            <Button type="primary" onClick={() => setShowChangePassword(true)}>
              Change Password
            </Button>
          </div>
        </Col>
      </Row>

      <Modal
        title="Change Password"
        open={showChangePassword}
        onCancel={() => setShowChangePassword(false)}
        footer={null}
      >
        <ChangePassword />
      </Modal>
    </div>
  );
}
