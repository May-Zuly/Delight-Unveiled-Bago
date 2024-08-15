import { Column } from "@ant-design/plots";

export default function ColumnChart({ data }) {
  const config = {
    data,
    xField: "date",
    yField: "value",
    label: {
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "类别",
      },
      sales: {
        alias: "销售额",
      },
    },
    animation: {
      appear: {
        duration: 4000, // 4 seconds
        easing: 'easeInOut', // Smoother easing effect
      },
    },
  };
  return <Column {...config} />;
}
