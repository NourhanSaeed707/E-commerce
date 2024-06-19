import client from "@/client/client";
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { getCookie } from "typescript-cookie";

export default function useDeleteCategoryType() {
  const apiUrl = "/api/category-type/delete";
  const [categoryTypeId, setCategoryTypeId] = useState<Number | null>(null);
  const [loadingCategoryType, setLoadingCategoryType] =
    useState<boolean>(false);
  const [categoryTypeResposne, setCategoryTypeResponse] =
    useState<AxiosResponse | null>(null);
  const [errorCategoryType, setErrorCategoryType] = useState<string | null>(
    null
  );

  const callAPI = useCallback(async (id: Number) => {
    setLoadingCategoryType(true);
    const token = getCookie("token");
    await client
      .delete(`${apiUrl}/${id}`, {
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`, // notice the Bearer before your token
        },
      })
      .then((res) => setCategoryTypeResponse(res))
      .catch((err) => setErrorCategoryType(err))
      .finally(() => {
        setLoadingCategoryType(false);
      });
  }, []);

  useEffect(() => {
    if (categoryTypeId) {
      callAPI(categoryTypeId);
    }
  }, [callAPI, categoryTypeId]);

  return {
    loadingCategoryType,
    categoryTypeResposne,
    errorCategoryType,
    setCategoryTypeId,
  };
}
