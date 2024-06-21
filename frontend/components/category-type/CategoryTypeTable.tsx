import { BUTTONS } from "@/constants/category";
import { Button, Space, Spin, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { useRouter } from "next/router";
import React from "react";
import moment from "moment";
import { DataTypeTable } from "@/types/category";

export default function CategoryTypeTable({
  categoryTypes,
  loadingCategoryType,
  errorCategoryType,
  setCategoryTypeIdDelete
}) {
  const router = useRouter();

  const columns: TableProps<DataTypeTable>["columns"] = [
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
            danger
            onClick={() => setCategoryTypeIdDelete(record.id)}
          >
            {BUTTONS.DELETE}
          </Button>
        </Space>
      ),
    },
  ];

  const data: DataTypeTable[] =
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
