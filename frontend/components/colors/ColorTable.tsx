import { BUTTONS } from "@/constants/category";
import { DataTypeTable } from "@/types/category";
import { DataColorTypeTable } from "@/types/color";
import { Button, Space, Spin, Table, TableProps } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";

export default function ColorTable({
  entities,
  loading,
  errors,
  setEntityIdDelete,
}) {
  const router = useRouter();
  const columns: TableProps<DataColorTypeTable>["columns"] = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "createdAt",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            className="bg-yellow-500 border-yellow-500 hover:bg-yellow-400 hover:border-yellow-400"
            onClick={() => router.push(`/products/edit/${record.id}`)}
          >
            {BUTTONS.EDIT}
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => setEntityIdDelete(record.id)}
          >
            {BUTTONS.DELETE}
          </Button>
        </Space>
      ),
    },
  ];

  const data: DataColorTypeTable[] =
    entities &&
    entities.length &&
    entities.map((color) => ({
      key: color.id,
      id: color.id,
      createdAt: moment(color.createdAt).format("DD-MM-YYYY"),
      color: color.color,
    }));
    
  return (
    <div>
      {loading ? <Spin /> : <Table columns={columns} dataSource={data} />}
    </div>
  );
}
