import { GetOneService } from "@/services/category-type/getOneService";
import { CategoryType } from "@/types/category";
import useSWR from "swr";

export default function useGetOneCategoryType(id: Number) {
  const apiUrl = "/api/category-type/get";

  const getOne = async () => {
    const data = await GetOneService(id);
    return data;
  }

  const {data, error} = useSWR<CategoryType> (`${apiUrl}/${id}`, getOne, {
    dedupingInterval: 1000
  });

  const loading = !data && !error;
  const errorCategoryType = error ? error.message : null;

  return {
    loading,
    errorCategoryType,
    catgeoryType: data || null,
  };
}
