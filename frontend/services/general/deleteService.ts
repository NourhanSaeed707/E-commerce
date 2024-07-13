import client from "@/client/client";
import { DeleteAndGetOneServices } from "@/types/services";

export const DeleteService = async ({
  apiUrl,
  token,
  id,
}: DeleteAndGetOneServices) => {
  const response = await client.delete(`${apiUrl}/${id}`, {
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`, // notice the Bearer before your token
    },
  });
  return response;
};
