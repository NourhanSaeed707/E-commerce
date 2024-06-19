import useAddCategoryType from "@/hooks/category-type/useAddCategoryType";
import { CategoryType } from "@/types/category";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { toast } from "react-toastify";

const useAddCategoryFacade = () => {
  const router = useRouter();
  const {
    setCategoryType,
    errorCategoryType,
    loadingCategoryType,
    categoryTypeResposne,
  } = useAddCategoryType();

  const addCategoryType = useCallback((categoryType: CategoryType) => {
    setCategoryType(categoryType);
    if (!loadingCategoryType && !errorCategoryType && categoryTypeResposne) {
      toast.success("Category type added successfully");
      router.push("/");
    }
  },[categoryTypeResposne, errorCategoryType, loadingCategoryType, router, setCategoryType]);

  return {
    addCategoryType,
  };
};
export default useAddCategoryFacade;
