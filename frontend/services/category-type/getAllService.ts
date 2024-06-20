import client from "@/client/client";
import { CategoryType } from "@/types/category";
import { getCookie } from "typescript-cookie";

export const GetAllService = async (): Promise<CategoryType[] | []> => {
  const apiUrl = "/api/category-type/get-all";
  const token = getCookie("token");
  const { data } = await client.get(apiUrl, {
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}