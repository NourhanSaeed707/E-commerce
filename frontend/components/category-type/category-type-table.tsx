import { Spin } from "antd";
import type { TableProps } from "antd";
import React from "react";
import moment from "moment";
import { DataTypeTable } from "@/types/category";
import TableAnt from "../shared/table";
import ColumnsConfig from "./columns-config";

export default function CategoryTypeTable({
  entities,
  loading,
  errors,
  total,
  currentPage,
  handlePageChange,
  setEntityIdDelete,
}) {
  const columns: TableProps<DataTypeTable>["columns"] =
    ColumnsConfig(setEntityIdDelete);
  const data: DataTypeTable[] =
    entities &&
    entities.map((category: any) => ({
      key: category.id,
      id: category.id,
      name: category.name,
      createdAt: moment(category.createdAt).format("DD-MM-YYYY"),
    }));

  const tableProps = {
    columns,
    dataSource: data,
    total,
    currentPage,
    handlePageChange,
  };

  return <div>{loading ? <Spin /> : <TableAnt {...tableProps} />}</div>;
}
