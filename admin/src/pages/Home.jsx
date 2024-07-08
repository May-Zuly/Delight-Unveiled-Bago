import { Card, Col, Row, Spin, Typography, message } from "antd";
import { useEffect, useState } from "react";

import ColumnChart from "../components/ColumnChart";
import PieChart from "../components/PieChart";
import { UserOutlined } from "@ant-design/icons";
import api from "../api/helper";

const { Title } = Typography;
export default function Home() {
  const [loading, setLoading] = useState("");
  const [userCount, setUserCount] = useState("");

  useEffect(() => {
    fetchUserCount();
  }, []);

  const fetchUserCount = async () => {
    setLoading(true);
    try {
      const res = await api.get("users/count", {
        headers: { requireToken: true },
      });
      if (res.data) {
        setUserCount(res.data);
        setLoading(false);
      }
    } catch (error) {
      message.error("An Error Occured");
      setLoading(false);
    }
  };

  const count = [
    {
      today: "Total User",
      title: userCount,
      icon: <UserOutlined style={{ fontSize: 18 }} />,
    },
    {
      today: "Total Producer",
      title: "5",
      icon: <UserOutlined style={{ fontSize: 18 }} />,
    },
    {
      today: "Total Customer",
      title: "20",
      icon: <UserOutlined style={{ fontSize: 18 }} />,
    },
    {
      today: "Total Order",
      title: "1000",
      icon: <UserOutlined style={{ fontSize: 18 }} />,
    },
  ];
  return (
    <>
      <Spin spinning={loading}>
        <Row gutter={[24, 0]}>
          {count.map((c, index) => (
            <Col
              key={index}
              xs={24}
              sm={24}
              md={12}
              lg={6}
              xl={6}
              className="mb-24"
            >
              <Card
                bordered={false}
                style={{
                  marginTop: "10px",
                  padding: 0,
                  background: "#E5EEF6",
                }}
              >
                <Row align="middle" gutter={[24, 0]}>
                  <Col xs={18}>
                    <span
                      style={{
                        color: "#8c8c8c",
                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                    >
                      {c.today}
                    </span>
                    <Title level={3}>{c.title}</Title>
                  </Col>
                  <Col xs={6}>
                    <div className="icon-box">{c.icon}</div>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
        {/* <Row gutter={16}>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title={
                  <span style={{ color: "#3f8600" }}>
                    <UserOutlined style={{ fontSize: "25px" }} /> User Count
                  </span>
                }
                value={userCount}
                valueStyle={{ color: "#3f8600" }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="Idle"
                value={9.3}
                precision={2}
                valueStyle={{ color: "#cf1322" }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="Active"
                value={11.28}
                precision={2}
                valueStyle={{ color: "#3f8600" }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false}>
              <Statistic
                title="Idle"
                value={9.3}
                precision={2}
                valueStyle={{ color: "#cf1322" }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
        </Row> */}
        <Row gutter={[16, 16]}>
          <Col span={10}>
            <ColumnChart />
          </Col>
          <Col>
            <PieChart />
          </Col>
        </Row>
      </Spin>
    </>
  );
}
