import client from "@/client/client";
import { IGetOneByObjectService } from "@/types/services";

export const GetOneByObjectService = async <T>(
  props: IGetOneByObjectService
): Promise<T | null> => {
  const { data } = await client.post(props.apiUrl, props.object, {
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${props.token}`,
    },
  });
  return data;
};
