import client from "@/client/client";
import { getCookie } from "typescript-cookie";

export const DeleteService = async (id: Number) => {
  const apiUrl = "/api/category-type/delete";
  const token = getCookie("token");

  const response = await client.delete(`${apiUrl}/${id}`, {
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`, // notice the Bearer before your token
    },
  });
  return response;
};
