import useGetAllCategoryType from "@/hooks/category-type/useGetAllCategoryType";
import { CategoryType } from "@/types/category";
import { Space, Spin, Table, Tag } from "antd";
import type { TableProps } from "antd";
import React from "react";

interface DataType {
  key: string;
  id: number;
  name: string;
  createdAt: number;
}

export default function CategoryTypeTable({categoryTypes,loadingCategoryType, errorCategoryType}) {
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
          <a>edit </a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const data: DataType[] = categoryTypes && categoryTypes.map((category: any) => ({
    key: category.id,
    id: category.id,
    name: category.name,
    createdAt: category.createdAt,
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
