import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";

import ColumnChart from "../components/ColumnChart";
import PieChart from "../components/PieChart";
import { useRecoilValue } from "recoil";
import { userData } from "../store";

export default function Home() {
  const user = useRecoilValue(userData);

  return (
    <>
      <Row gutter={16}>
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
      </Row>
      <Row gutter={16}>
        <Col span={10}>
          <ColumnChart />
        </Col>
        <Col>
          <PieChart />
        </Col>
      </Row>
    </>
  );
}
