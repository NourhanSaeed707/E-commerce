import FetchToken from "@/helper/token";
import { GetOneByObjectService } from "@/services/general/getOneByObjectService";
import { IGetOneByObjectService } from "@/types/services";
import useSWR from "swr";

export default function useGetOneByObject<T>(apiUrl: string, object: any) {
  const fetcher = async () => {
    const { accessToken } = await FetchToken();
    const props: IGetOneByObjectService = {
      apiUrl,
      token: accessToken.token,
      object,
    };
    const data = await GetOneByObjectService<T>({ ...props });
    return data;
  };

  const { data, error } = useSWR([apiUrl, object], fetcher, {
    dedupingInterval: 1000,
  });

  const loading = !error && !data;
  const errors = error ? error.message : null;
  const entity = data || null;

  return {
    loading,
    errors,
    entity,
  };
}
