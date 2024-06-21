import { BUTTONS } from "@/constants/category";
import { Button, Space, Spin, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { useRouter } from "next/router";
import React from "react";
import moment from "moment"; 

interface DataType {
  key: string;
  id: number;
  name: string;
  createdAt: number;
}

export default function CategoryTypeTable({
  categoryTypes,
  loadingCategoryType,
  errorCategoryType,
}) {
  const router = useRouter();
  const columns: TableProps<DataType>["columns"] = [
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
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            className="bg-yellow-500 border-yellow-500 hover:bg-yellow-400 hover:border-yellow-400"
            onClick={() => router.push(`/category-type/edit/${record.id}`)}
          >
            {BUTTONS.EDIT}
          </Button>
          <Button
            type="primary"
            className="bg-red-500 border-red-500 hover:bg-red-400 hover:border-red-400 ml-2"
            onClick={() => router.push("")}
          >
            {BUTTONS.DELETE}
          </Button>
        </Space>
      ),
    },
  ];

  const data: DataType[] =
    categoryTypes &&
    categoryTypes.map((category: any) => ({
      key: category.id,
      id: category.id,
      name: category.name,
      createdAt: moment(category.createdAt).format("DD-MM-YYYY"),
    }));

  return (
    <div>
      {loadingCategoryType ? (
        <Spin />
      ) : (
        <Table columns={columns} dataSource={data} />
      )}
    </div>
  );
}
