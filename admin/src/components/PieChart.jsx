import { Pie } from "@ant-design/plots";

export default function PieChart({ data }) {
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "date",
    radius: 0.8,
    interactions: [
      {
        type: "element-active",
      },
    ],
  };
  return <Pie {...config} />;
}
