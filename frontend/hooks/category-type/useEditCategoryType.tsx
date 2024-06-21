import { EditService } from "@/services/general/editService";
import { CategoryType } from "@/types/category";
import { EditServices } from "@/types/services";
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { getCookie } from "typescript-cookie";

export default function useEditCategoryType() {
  const apiUrl = "/api/category-type/edit";
  const token = getCookie("token");
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

  const callAPI = useCallback(async (id: Number, body) => {
    setLoadingCategoryType(true);
    setErrorCategoryType(null);
    const props: EditServices = {
      apiUrl,
      token,
      id,
      body
    }
    try {
      const response = await EditService({...props});
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
