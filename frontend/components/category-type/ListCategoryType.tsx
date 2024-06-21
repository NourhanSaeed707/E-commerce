import useGetAllCategoryType from "@/hooks/category-type/useGetAllCategoryType";
import React, { useEffect } from "react";
import CategoryTypeTable from "./CategoryTypeTable";
import { CategoryTypeTableProps } from "@/types/category";
import { Button } from "antd";
import { useRouter } from "next/router";
import { BUTTONS } from "@/constants/category";
import useDeleteCategoryType from "@/hooks/category-type/useDeleteCategoryType";
import { mutate } from "swr";

export default function ListCategoryType() {
  const router = useRouter();
  const { categoryTypes, errorCategoryType, loadingCategoryType, fetcher } =
    useGetAllCategoryType();

  const {
    setCategoryTypeIdDelete,
    categoryTypeIdDelete,
    categoryTypeResposneDelete,
    loadingCategoryTypeDelete,
    errorCategoryTypeDelete,
  } = useDeleteCategoryType();

  const props: CategoryTypeTableProps = {
    categoryTypes,
    loadingCategoryType,
    errorCategoryType,
    setCategoryTypeIdDelete,
  };

  useEffect(() => {
    if (
      !loadingCategoryTypeDelete &&
      !errorCategoryTypeDelete &&
      categoryTypeResposneDelete &&
      categoryTypeIdDelete
    ) {
      mutate("/api/category-type/get-all");
    }
  }, [
    categoryTypeIdDelete,
    categoryTypeResposneDelete,
    errorCategoryTypeDelete,
    loadingCategoryTypeDelete,
  ]);

  return (
    <div>
      <Button
        type="primary"
        onClick={() => router.push("/category-type/add")}
        className="mb-2 mt-2"
      >
        {BUTTONS.ADD}
      </Button>
      <CategoryTypeTable {...props} />
    </div>
  );
}
