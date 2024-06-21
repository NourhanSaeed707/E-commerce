import { DeleteService } from "@/services/general/deleteService";
import { DeleteAndGetOneServices } from "@/types/services";
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { getCookie } from "typescript-cookie";

export default function useDeleteCategoryType() {
  const apiUrl = "/api/category-type/delete";
  const token = getCookie("token");
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
    const props: DeleteAndGetOneServices = {
      apiUrl,
      token,
      id
    }
    try {
      const response = await DeleteService({...props});
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
