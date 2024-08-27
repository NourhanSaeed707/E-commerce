import { ProductTableProps } from "@/types/product";
import { useRouter } from "next/router";
import React, { useState } from "react";
import ProductTable from "./ProductTable";
import { Button } from "antd";
import { BUTTONS } from "@/constants/category";
import useGetAllEntity from "@/hooks/general-crud/useGetAllEntity";
import useDeleteEntity from "@/hooks/general-crud/useDeleteEntity";
import { PAGINATION_SIZE } from "@/constants/pagination";

function ListProductAdmin() {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const apiGetAllUrl = `/api/product/get-all?page=${currentPage - 1}&size=${PAGINATION_SIZE}`;
  const apiDeleteUrl = "/api/product/delete";
  const { entities, errors, loading, total } = useGetAllEntity(apiGetAllUrl);
  const {
    setEntityId: setEntityIdDelete,
    entityId: deleteId,
    loading: loadingDelete,
    response: responseDelete,
    error: errorDelete,
  } = useDeleteEntity(apiDeleteUrl);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const props: ProductTableProps = {
    entities,
    loading,
    errors,
    currentPage,
    total,
    setEntityIdDelete,
    handlePageChange
  };
  
  return (
    <div>
      <Button
        type="primary"
        onClick={() => router.push("/products/add")}
        className="mb-2 mt-2"
      >
        {BUTTONS.ADD}
      </Button>
      <Button
          type="text"
          onClick={() => router.push("/")}
          className="mb-2 mt-2"
          style={{ backgroundColor: '#D1D100' }}
        >
          {BUTTONS.BACK}
        </Button>
      <ProductTable {...props} />
    </div>
  );
}

export default ListProductAdmin;
