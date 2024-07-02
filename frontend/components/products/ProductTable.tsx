import { BUTTONS } from "@/constants/category";
import { DataTypeTable } from "@/types/category";
import { Button, Space, Spin, Table, TableProps } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";

export default function ProductTable({
  entities,
  loading,
  errors,
  setEntityIdDelete,
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
      title: "category-type",
      dataIndex: "category-type",
      key: "category-type",
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
            onClick={() => setEntityIdDelete(record.id)}
          >
            {BUTTONS.DELETE}
          </Button>
        </Space>
      ),
    },
  ];

  const data: DataTypeTable[] =
    entities &&
    entities.map((product: any) => ({
      key: product.id,
      id: product.id,
      name: product.name,
      createdAt: moment(product.createdAt).format("DD-MM-YYYY"),
      price: product.price,
      stock: product.stock,
    }));

  return (
    <div>
      {loading ? <Spin /> : <Table columns={columns} dataSource={data} />}
    </div>
  );
}