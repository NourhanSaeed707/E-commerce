import React, { useEffect } from "react";
import CategoryTypeTable from "./CategoryTypeTable";
import { CategoryTypeTableProps } from "@/types/category";
import { Button } from "antd";
import { useRouter } from "next/router";
import { BUTTONS } from "@/constants/category";
import { mutate } from "swr";
import useGetAllEntity from "@/hooks/general-crud/useGetAllEntity";
import useDeleteEntity from "@/hooks/general-crud/useDeleteEntity";

export default function ListCategoryType() {
  const router = useRouter();
  const apiGetAllUrl = "/api/category-type/get-all";
  const apiDeleteUrl = "/api/category-type/delete";
  const {entities, errors, loading} = useGetAllEntity(apiGetAllUrl);
  const {setEntityId: setEntityIdDelete, entityId: deleteId, loading: loadingDelete, response: responseDelete, error: errorDelete } = useDeleteEntity(apiDeleteUrl);

  const props: CategoryTypeTableProps = {
    entities,
    loading,
    errors,
    setEntityIdDelete,
  };

  useEffect(() => {
    if (
      !loadingDelete &&
      !errorDelete &&
      responseDelete &&
      deleteId
    ) {
      mutate("/api/category-type/get-all");
    }
  }, [deleteId, errorDelete, loadingDelete, responseDelete]);

  return (
    <div>
      <Button
        type="primary"
        onClick={() => router.push("/category-type/add")}
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
      <CategoryTypeTable {...props} />
    </div>
  );
}
