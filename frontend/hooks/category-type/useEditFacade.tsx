import { useRouter } from "next/router";
import useGetOneCategoryType from "./useGetOneCatgeoryType";
import { useEffect } from "react";
import { Form } from "antd";
import useEditCategoryType from "./useEditCategoryType";
import { CategoryType, editFacadeProps } from "@/types/category";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function useEditFacade({ id, formRef }: editFacadeProps) {
  const router = useRouter();
  const { catgeoryType, loading } = useGetOneCategoryType(Number(id));
  const {
    setCategoryTypeId,
    setUpdatedCategoryType,
    loadingCategoryType,
    errorCategoryType,
    categoryTypeResposne,
  } = useEditCategoryType();

  useEffect(() => {
    if (catgeoryType) {
      formRef.setFieldsValue({
        name: catgeoryType.name,
      });
    }
  }, [catgeoryType, formRef]);

  const editCategoryType = (updatedValues: CategoryType) => {
    setCategoryTypeId(id);
    setUpdatedCategoryType(updatedValues);
  };

  useEffect(() => {
    if (!loadingCategoryType && !errorCategoryType && categoryTypeResposne) {
      router.push("/category-type/get-all");
    }
  }, [categoryTypeResposne, errorCategoryType, loadingCategoryType, router]);

  return {
    editCategoryType,
  };
}
