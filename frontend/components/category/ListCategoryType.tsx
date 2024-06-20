import useGetAllCategoryType from "@/hooks/category-type/useGetAllCategoryType";
import React, { useEffect } from "react";
import CategoryTypeTable from "./CategoryTypeTable";
import { CategoryTypeTableProps } from "@/types/category";
import { Button } from "antd";
import { useRouter } from "next/router";

export default function ListCategoryType() {
  const router = useRouter();
  const { categoryTypes, errorCategoryType, loadingCategoryType } =
    useGetAllCategoryType();

  const props: CategoryTypeTableProps = {
    categoryTypes,
    loadingCategoryType,
    errorCategoryType,
  };

  return (
    <div>
      <Button onClick={() => router.push("/category-type/add")}>Add New</Button>
      <CategoryTypeTable {...props} />
    </div>
  );
}
