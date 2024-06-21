import { GetAllService } from "@/services/general/getAllService";
import { GetAllServices } from "@/types/services";
import useSWR from "swr";
import { getCookie } from "typescript-cookie";

export default function useGetAllEntity(apiUrl: string) {
  const token = getCookie("token");
  const props: GetAllServices = {
    apiUrl,
    token,
  };
  const fetcher = async () => {
    const data = await GetAllService({ ...props });
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
