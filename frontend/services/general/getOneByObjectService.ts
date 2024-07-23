import client from "@/client/client";
import { IGetOneByObjectService } from "@/types/services";

export const GetOneByObjectService = async <T>(
  props: IGetOneByObjectService
): Promise<T | null> => {
  console.log("insiiiiiiiide get one by object service: ");
  console.log(props.apiUrl);
  console.log(props.token);
  console.log(props.object);
  const { data } = await client.post(props.apiUrl, props.object, {
    headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${props.token}`,
    },
  });
  return data;
};
