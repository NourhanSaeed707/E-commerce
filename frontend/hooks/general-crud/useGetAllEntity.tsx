import FetchToken from "@/helper/token";
import { GetAllService } from "@/services/general/getAllService";
import { GetAllServices } from "@/types/services";
import useSWR from "swr";

export default function useGetAllEntity(apiUrl: string) {
  const fetcher = async () => {
    const { accessToken } = await FetchToken();
    const props: GetAllServices = {
      apiUrl,
      token: accessToken.token,
    };
    const data = await GetAllService({ ...props });
    console.log("daaaaaaaaata of get all : ", data);
    return data;
  };

  const { data, error } = useSWR<any[]>(apiUrl, fetcher, {
    dedupingInterval: 1000,
  });

  const loading = !data && !error;
  const errors = error ? error.message : null;

  return {
    entities: data || null,
    loading,
    errors,
    fetcher,
  };
}
