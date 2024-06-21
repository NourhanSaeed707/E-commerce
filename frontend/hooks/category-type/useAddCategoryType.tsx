import {  AddService } from "@/services/general/addService";
import { CategoryType } from "@/types/category";
import { AddServices } from "@/types/services";
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { getCookie } from "typescript-cookie";

export default function useAddCategoryType() {
  const apiUrl = "/api/category-type/save";
  const token = getCookie("token");
  const [categoryType, setCategoryType] = useState<CategoryType | null>(null);
  const [loadingCategoryType, setLoadingCategoryType] =
    useState<boolean>(false);
  const [categoryTypeResposne, setCategoryTypeResponse] =
    useState<AxiosResponse | null>(null);
  const [errorCategoryType, setErrorCategoryType] = useState<string | null>(
    null
  );

  const callAPI = useCallback(async (body: CategoryType) => {
    setErrorCategoryType(null);
    setLoadingCategoryType(true);
    const props: AddServices = {
      apiUrl,
      token,
      body
    }
    try {
      const response = await AddService({...props});
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
