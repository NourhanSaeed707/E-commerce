import { GetOneService } from "@/services/general/getOneService";
import { CategoryType } from "@/types/category";
import { DeleteAndGetOneServices } from "@/types/services";
import useSWR from "swr";
import { getCookie } from "typescript-cookie";

export default function useGetOneCategoryType(id: Number) {
  const apiUrl = "/api/category-type/get";
  const token = getCookie("token");
  const props: DeleteAndGetOneServices = {
    apiUrl,
    token,
    id,
  };
  const getOne = async () => {
    const data = await GetOneService({...props});
    return data;
  };

  const { data, error } = useSWR<CategoryType>(`${apiUrl}/${id}`, getOne, {
    dedupingInterval: 1000,
  });

  const loading = !data && !error;
  const errorCategoryType = error ? error.message : null;

  return {
    loading,
    errorCategoryType,
    catgeoryType: data || null,
  };
}
