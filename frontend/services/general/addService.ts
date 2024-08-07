import client from "@/client/client";
import { AddServices } from "@/types/services";
import { AxiosResponse } from "axios";

export const AddService = async ({
  apiUrl,
  token,
  body,
}: AddServices): Promise<AxiosResponse> => {
  
  try {
    const response = await client.post(apiUrl, body, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    throw error; // Rethrow the error to handle it in the caller function
  }
};
