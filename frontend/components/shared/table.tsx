import React from "react";
import { Table } from "antd";
import { TableAntProps } from "@/types/tables";
import { PAGINATION_SIZE } from "@/constants/pagination";

function TableAnt<T>({ columns, dataSource, currentPage, total, handlePageChange }: TableAntProps<T>) {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={{
        current: currentPage,
        pageSize: PAGINATION_SIZE,
        total,
        onChange: handlePageChange,
      }}
    />
  );
}

export default TableAnt;
