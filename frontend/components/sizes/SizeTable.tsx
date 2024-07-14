import { BUTTONS } from "@/constants/category";
import { DataSizeTypeTable, Size } from "@/types/size";
import { Button, Space, Spin, Table, TableProps } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import React from "react";

export default function SizeTable({
  entities,
  loading,
  errors,
  setEntityIdDelete,
}) {
  const router = useRouter();
  const columns: TableProps<DataSizeTypeTable>["columns"] = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "size",
      dataIndex: "size",
      key: "size",
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
            onClick={() => router.push(`/sizes/edit/${record.id}`)}
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

  const data: DataSizeTypeTable[] =
    entities &&
    entities.length &&
    entities.map((size: Size) => ({
      key: size.id,
      id: size.id,
      size: size.size,
      createdAt: moment(size.createdAt).format("DD-MM-YYYY"),
    }));
  return (
    <div>
      {loading ? <Spin /> : <Table columns={columns} dataSource={data} />}
    </div>
  );
}
