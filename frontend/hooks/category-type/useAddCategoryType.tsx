import { AddCategoryType } from "@/services/category-type/addService";
import { CategoryType } from "@/types/category";
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";

export default function useAddCategoryType() {
  const [categoryType, setCategoryType] = useState<CategoryType | null>(null);
  const [loadingCategoryType, setLoadingCategoryType] =
    useState<boolean>(false);
  const [categoryTypeResposne, setCategoryTypeResponse] =
    useState<AxiosResponse | null>(null);
  const [errorCategoryType, setErrorCategoryType] = useState<string | null>(
    null
  );

  const callAPI = useCallback(async (categoryType: CategoryType) => {
    setErrorCategoryType(null);
    setLoadingCategoryType(true);
    try {
      const response = await AddCategoryType(categoryType);
      setCategoryTypeResponse(response);
    } catch (error) {
      setErrorCategoryType(error);
    } finally {
      setLoadingCategoryType(false);
    }
  }, []);

  useEffect(() => {
    if (categoryType) {
      callAPI(categoryType);
    }
  }, [callAPI, categoryType]);

  return {
    categoryTypeResposne,
    errorCategoryType,
    loadingCategoryType,
    setCategoryType,
  };
}
