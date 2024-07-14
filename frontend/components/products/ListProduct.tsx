import { ProductTableProps } from "@/types/product";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import ProductTable from "./ProductTable";
import { Button } from "antd";
import { BUTTONS } from "@/constants/category";
import useGetAllEntity from "@/hooks/general-crud/useGetAllEntity";
import useDeleteEntity from "@/hooks/general-crud/useDeleteEntity";

function ListProduct() {
  const router = useRouter();
  const apiGetAllUrl = "/api/product/get-all";
  const apiDeleteUrl = "/api/product/delete";
  const { entities, errors, loading } = useGetAllEntity(apiGetAllUrl);
  const {
    setEntityId: setEntityIdDelete,
    entityId: deleteId,
    loading: loadingDelete,
    response: responseDelete,
    error: errorDelete,
  } = useDeleteEntity(apiDeleteUrl);

  const props: ProductTableProps = {
    entities,
    loading,
    errors,
    setEntityIdDelete,
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

export default ListProduct;
