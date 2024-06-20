import client from "@/client/client";
import { CategoryType } from "@/types/category";
import { AxiosResponse } from "axios";
import { getCookie } from "typescript-cookie";

export const AddCategoryType = async (
  categoryType: CategoryType
): Promise<AxiosResponse> => {
  const apiUrl = "/api/category-type/save";
  const token = getCookie("token");

  const response = await client.post(apiUrl, categoryType, {
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};
