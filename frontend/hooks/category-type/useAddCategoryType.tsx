import client from "@/client/client";
import { CategoryType } from "@/types/category";
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { getCookie } from "typescript-cookie";

export default function useAddCategoryType() {
  const apiUrl = "/api/category-type/save";
  const [categoryType, setCategoryType] = useState<CategoryType | null>(null);
  const [loadingCategoryType, setLoadingCategoryType] = useState<boolean>(false);
  const [categoryTypeResposne, setCategoryTypeResponse] =
    useState<AxiosResponse | null>(null);
  const [errorCategoryType, setErrorCategoryType] = useState<string | null>(
    null
  );

  const callAPI = useCallback(async (categoryType) => {
    setErrorCategoryType(null);
    setLoadingCategoryType(true);
    const token = getCookie("token");
    await client
      .post(apiUrl, categoryType, {
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCategoryTypeResponse(res);
      })
      .catch((err) => setErrorCategoryType(err))
      .finally(() => {
        setLoadingCategoryType(false);
      });
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
