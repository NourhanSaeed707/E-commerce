import { EditService } from "@/services/category-type/editService";
import { CategoryType } from "@/types/category";
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";

export default function useEditCategoryType() {
  const [categoryTypeId, setCategoryTypeId] = useState<Number | null>(null);
  const [loadingCategoryType, setLoadingCategoryType] =
    useState<boolean>(false);
  const [categoryTypeResposne, setCategoryTypeResponse] =
    useState<AxiosResponse | null>(null);
  const [errorCategoryType, setErrorCategoryType] = useState<string | null>(
    null
  );
  const [updatedCategoryType, setUpdatedCategoryType] =
    useState<CategoryType | null>(null);

  const callAPI = useCallback(async (id: Number, updatedCategoryType) => {
    setLoadingCategoryType(true);
    setErrorCategoryType(null);
    try {
      const response = await EditService(id, updatedCategoryType);
      setCategoryTypeResponse(response);
    } catch (error) {
      setErrorCategoryType(error);
    } finally {
      setLoadingCategoryType(false);
    }
  }, []);

  useEffect(() => {
    if (categoryTypeId && updatedCategoryType) {
      callAPI(categoryTypeId, updatedCategoryType);
    }
  }, [callAPI, categoryTypeId, updatedCategoryType]);

  return {
    loadingCategoryType,
    errorCategoryType,
    categoryTypeResposne,
    setCategoryTypeId,
    setUpdatedCategoryType
  };
}
