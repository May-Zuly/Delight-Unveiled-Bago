import { Table } from "antd";

export default function Table({ data, columns, handleChange }) {
  return (
    <>
      <Table columns={columns} dataSource={data} onChange={handleChange} />
    </>
  );
}
