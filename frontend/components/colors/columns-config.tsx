import { BUTTONS } from "@/constants/category";
import { Button, Space } from "antd";
import { useRouter } from "next/router";
import React from "react";

function ColumnsConfig({setEntityIdDelete}) {
  const router = useRouter();

  return [
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
            onClick={() => router.push(`/colors/edit/${record.id}`)}
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
