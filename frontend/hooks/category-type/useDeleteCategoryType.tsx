import { DeleteService } from "@/services/category-type/deleteService";
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";

export default function useDeleteCategoryType() {
  const [categoryTypeIdDelete, setCategoryTypeIdDelete] = useState<Number | null>(null);
  const [loadingCategoryTypeDelete, setLoadingCategoryType] =
    useState<boolean>(false);
  const [categoryTypeResposneDelete, setCategoryTypeResponse] =
    useState<AxiosResponse | null>(null);
  const [errorCategoryTypeDelete, setErrorCategoryType] = useState<string | null>(
    null
  );

  const callAPI = useCallback(async (id: Number) => {
    setLoadingCategoryType(true);
    try {
      const response = await DeleteService(id);
      setCategoryTypeResponse(response);
    } catch (error) {
      setErrorCategoryType(error);
    } finally {
      setLoadingCategoryType(false);
    }
  }, []);

  useEffect(() => {
    if (categoryTypeIdDelete) {
      callAPI(categoryTypeIdDelete);
    }
  }, [callAPI, categoryTypeIdDelete]);

  return {
    loadingCategoryTypeDelete,
    categoryTypeResposneDelete,
    errorCategoryTypeDelete,
    setCategoryTypeIdDelete,
    categoryTypeIdDelete
  };
}
