import { Spin, TableProps } from "antd";
import moment from "moment";
import React from "react";
import TableAnt from "../shared/table";
import { DataColorTypeTable } from "@/types/color";
import ColumnsConfig from "./columns-config";

export default function ColorTable({
  entities,
  loading,
  errors,
  total,
  currentPage,
  handlePageChange,
  setEntityIdDelete,
}) {
  const columns: TableProps<DataColorTypeTable>["columns"] = ColumnsConfig(setEntityIdDelete);

  const data: DataColorTypeTable[] =
    entities &&
    entities.length &&
    entities.map((color) => ({
      key: color.id,
      id: color.id,
      createdAt: moment(color.createdAt).format("DD-MM-YYYY"),
      color: color.color,
    }));

    const tableProps = {
      columns,
      dataSource: data,
      total,
      currentPage,
      handlePageChange
    }
    
  return (
    <div>
      {loading ? <Spin /> : <TableAnt<DataColorTypeTable> {...tableProps} />}
    </div>
  );
}
