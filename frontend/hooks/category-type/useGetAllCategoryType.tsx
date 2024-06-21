import { GetAllService } from "@/services/general/getAllService";
import { CategoryType } from "@/types/category";
import { GetAllServices } from "@/types/services";
import useSWR from "swr";
import { getCookie } from "typescript-cookie";

export default function useGetAllCategoryType() {
  const apiUrl = "/api/category-type/get-all";
  const token = getCookie("token");
  const props: GetAllServices = {
    apiUrl,
    token
  }
  const fetcher = async () => {
    const data = await GetAllService({...props});
    return data;
  };

  const { data, error } = useSWR<CategoryType[]>(apiUrl, fetcher, {
    dedupingInterval: 1000,
  });

  const loadingCategoryType = !data && !error;
  const errorCategoryType = error ? error.message : null;

  return {
    categoryTypes: data || null,
    loadingCategoryType,
    errorCategoryType,
    fetcher
  };
}
