import { GetAllService } from "@/services/category-type/getAllService";
import { CategoryType } from "@/types/category";
import useSWR from "swr";

export default function useGetAllCategoryType() {
  const apiUrl = "/api/category-type/get-all";

  const fetcher = async () => {
    const data = await GetAllService();
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
  };
}
