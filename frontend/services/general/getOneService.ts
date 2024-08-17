import client from "@/client/client";
import { DeleteAndGetOneServices } from "@/types/services";

export const GetOneService = async <T>({
  apiUrl,
  token,
  id,
}: DeleteAndGetOneServices): Promise<T | null> => {
  const { data } = await client.get(`${apiUrl}/${id}`, {
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
  return data;
};
