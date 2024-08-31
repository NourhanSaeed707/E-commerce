import { DataProductTypeTable, ProductForm } from "@/types/product";
import { Spin, TableProps } from "antd";
import moment from "moment";
import React from "react";
import TableAnt from "../../../shared/table";
import ColumnsConfig from "./columns-config";

export default function ProductTable({
  entities,
  loading,
  errors,
  currentPage,
  total,
  handlePageChange,
  setEntityIdDelete,
}) {
  const columns: TableProps<DataProductTypeTable>["columns"] = ColumnsConfig(setEntityIdDelete);

  const data: DataProductTypeTable[] =
    entities &&
    entities.length &&
    entities.map((product: ProductForm) => ({
      key: product.id,
      id: product.id,
      name: product.name,
      createdAt: moment(product.createdAt).format("DD-MM-YYYY"),
      price: product.price,
      stock: product.stock,
      categoryType:
        product && product.categoryType && product.categoryType.name,
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
      {loading ? (
        <Spin />
      ) : (
        <TableAnt<DataProductTypeTable> {...tableProps}/>
      )}
    </div>
  );
}
