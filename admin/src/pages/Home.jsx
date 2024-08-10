import { Card, Col, Row, Spin, Typography, message } from "antd";
import { useEffect, useState } from "react";

import ColumnChart from "../components/ColumnChart";
import PieChart from "../components/PieChart";
import {
  UserOutlined,
  ShoppingOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import api from "../api/helper";

const { Title } = Typography;
export default function Home() {
  const [loading, setLoading] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    fetchUserCount();
  }, []);

  const fetchUserCount = async () => {
    setLoading(true);
    try {
      const res = await api.get("order/analysis", {
        headers: { requireToken: true },
      });
      if (res.data) {
        setData(res.data);
        setLoading(false);
      }
    } catch (error) {
      message.error("An Error Occured");
      setLoading(false);
    }
  };

  const count = [
    {
      today: "Total Customer",
      title: data.customerCount,
      icon: <UserOutlined style={{ fontSize: 18 }} />,
    },
    {
      today: "Total Producer",
      title: data.producerCount,
      icon: <UserOutlined style={{ fontSize: 18 }} />,
    },
    {
      today: "Total Product",
      title: data.productCount,
      icon: <ShoppingOutlined style={{ fontSize: 18 }} />,
    },
    {
      today: "Total Order",
      title: data.orderCount,
      icon: <SolutionOutlined style={{ fontSize: 18 }} />,
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
                  background: "#aa620f", //#E5EEF6
                }}
              >
                <Row align="middle" gutter={[24, 0]}>
                  <Col xs={18}>
                    <span
                      style={{
                        color: "aliceblue", //#8c8c8c
                        fontWeight: "500",
                        fontSize: "14px",
                      }}
                    >
                      {c.today}
                    </span>
                    <Title level={3} style={{ color: "#d6bcbc" }}>
                      {c.title}
                    </Title>
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
            <ColumnChart data={data.barChart} />
          </Col>
          <Col>
            <PieChart data={data.pieChart} />
          </Col>
        </Row>
      </Spin>
    </>
  );
}
