import client from "@/client/client";
import { CategoryType } from "@/types/category";
import {  useState } from "react";
import useSWR from "swr";
import { getCookie } from "typescript-cookie";

export default function useGetAllCategoryType() {
  const apiUrl = "/api/category-type/get-all";
  const [loadingCategoryType, setLoadingCategoryType] =
    useState<boolean>(false);
  const [errorCategoryType, setErrorCategoryType] = useState<string | null>(
    null
  );

  const { data: categoryTypes, error } = useSWR<CategoryType[]>(
    apiUrl,
    async () => {
        setLoadingCategoryType(true);
      const token = getCookie("token");
      const { data } = await client.get(
        apiUrl,
        {
          headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoadingCategoryType(false);
      return data;
    },
    {
      dedupingInterval: 1000,
    }
  );

  return {
    categoryTypes,
    errorCategoryType,
    loadingCategoryType,
  };
}
