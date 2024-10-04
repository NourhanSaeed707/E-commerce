import FetchToken from "@/helper/token";
import { GetAllService } from "@/services/general/getAllService";
import { GetAllServices } from "@/types/services";
import useSWR from "swr";

export default function useGetAllEntity(apiUrl: string, paginated: boolean = true) {
  const fetcher = async () => {
    const { accessToken } = await FetchToken();
    const props: GetAllServices = {
      apiUrl,
      token: accessToken.token,
    };
    const data = await GetAllService({ ...props });
    return data;
  };

  const { data, error } = useSWR<any>(apiUrl, fetcher, {
    // dedupingInterval: 1000,
  });

  const loading = !data && !error;
  const errors = error ? error.message : null;

  return {
    entities: paginated ?  data && data.content || data : data,
    total: paginated ? data && data.totalElements : data && data.length,
    loading,
    errors,
    fetcher,
  };
}

