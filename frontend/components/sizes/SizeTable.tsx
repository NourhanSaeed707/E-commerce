import { DataSizeTypeTable, Size } from "@/types/size";
import { Spin } from "antd";
import moment from "moment";
import React from "react";
import ColumnsConfig from "./columns-config";
import TableAnt from "../shared/table";

export default function SizeTable({
  entities,
  loading,
  errors,
  total,
  currentPage,
  handlePageChange,
  setEntityIdDelete,
}) {
  const columns = ColumnsConfig(setEntityIdDelete);
  const data: DataSizeTypeTable[] =
    entities &&
    entities.length &&
    entities.map((size: Size) => ({
      key: size.id,
      id: size.id,
      size: size.size,
      createdAt: moment(size.createdAt).format("DD-MM-YYYY"),
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
