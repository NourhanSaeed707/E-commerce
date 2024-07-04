import FetchToken from "@/helper/token";
import { GetOneService } from "@/services/general/getOneService";
import { DeleteAndGetOneServices } from "@/types/services";
import useSWR from "swr";

export default function useGetOneEntity<T>(apiUrl: string, id: Number) {

  const fetcher = async () => {
    const { accessToken } = await FetchToken();
    const props: DeleteAndGetOneServices = {
      apiUrl,
      token: accessToken.token,
      id,
    };
    const data = await GetOneService<T>({ ...props });
    return data;
  }

  const { data, error } = useSWR(`${apiUrl}/${id}`, fetcher, {
    dedupingInterval: 1000,
  });

  const loading = !data && !error;
  const errors = error ? error.message : null;

  return {
    loading,
    errors,
    entity: data || null,
  };
}
