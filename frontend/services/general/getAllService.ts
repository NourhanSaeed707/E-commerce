import client from "@/client/client";
import { GetAllServices } from "@/types/services";

export const GetAllService = async ({apiUrl, token}: GetAllServices): Promise<any > => {
  const { data } = await client.get(apiUrl, {
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
}