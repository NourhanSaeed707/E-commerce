import client from "@/client/client";
import { EditServices } from "@/types/services";

export const EditService = async<T> ({apiUrl, token, id, body}: EditServices) => {
  const response = await client.put(`${apiUrl}/${id}`, body, {
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
