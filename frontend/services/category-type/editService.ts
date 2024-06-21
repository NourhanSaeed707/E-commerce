import client from "@/client/client";
import { getCookie } from "typescript-cookie";

export const EditService = async (id: Number, updatedCategoryType) => {
  const apiUrl = "/api/category-type/edit";
  const token = getCookie("token");

  const response = await client.put(`${apiUrl}/${id}`, updatedCategoryType, {
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
