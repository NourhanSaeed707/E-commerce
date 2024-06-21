import { GetOneService } from "@/services/general/getOneService";
import { DeleteAndGetOneServices } from "@/types/services";
import useSWR from "swr";
import { getCookie } from "typescript-cookie";

export default function useGetOneEntity<T>(apiUrl: string, id: Number) {
  const token = getCookie("token");
  const props: DeleteAndGetOneServices = {
    apiUrl,
    token,
    id,
  };

  const getOne = async () => {
    const data = await GetOneService({ ...props });
    return data;
  };

  const { data, error } = useSWR(`${apiUrl}/${id}`, getOne, {
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
