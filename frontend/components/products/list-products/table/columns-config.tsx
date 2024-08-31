import React from "react";
import { Button, Space } from "antd";
import { BUTTONS } from "@/constants/category";
import { useRouter } from "next/router";

function ColumnsConfig(setEntityIdDelete) {
  const router = useRouter();
  return [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "createdAt",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "categoryType",
      dataIndex: "categoryType",
      key: "categoryType",
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
}

export default ColumnsConfig;
