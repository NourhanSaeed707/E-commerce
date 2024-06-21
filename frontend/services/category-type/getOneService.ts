import client from "@/client/client";
import { CategoryType } from "@/types/category";
import { getCookie } from "typescript-cookie";

export const GetOneService = async (
  id: Number
): Promise<CategoryType | null> => {
  const apiUrl = "/api/category-type/get";
  const token = getCookie("token");

  const { data } = await client.get(`${apiUrl}/${id}`, {
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
