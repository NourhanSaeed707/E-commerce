import client from "@/client/client";
import { CategoryType } from "@/types/category";
import { DeleteAndGetOneServices } from "@/types/services";

export const GetOneService = async ({
  apiUrl,
  token,
  id,
}: DeleteAndGetOneServices): Promise<CategoryType | null> => {
  const { data } = await client.get(`${apiUrl}/${id}`, {
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
