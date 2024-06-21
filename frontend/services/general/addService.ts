import client from "@/client/client";
import { AddServices } from "@/types/services";
import { AxiosResponse } from "axios";

export const AddCategoryType = async ({
  apiUrl,
  token,
  body,
}: AddServices): Promise<AxiosResponse> => {
  const response = await client.post(apiUrl, body, {
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};
