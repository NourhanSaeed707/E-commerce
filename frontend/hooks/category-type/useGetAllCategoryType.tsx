import FetchToken from "@/helper/token";
import { GetAllService } from "@/services/general/getAllService";
import { CategoryType } from "@/types/category";
import { GetAllServices } from "@/types/services";
import useSWR from "swr";
import { getCookie } from "typescript-cookie";

export default function useGetAllCategoryType() {
  const apiUrl = "/api/category-type/get-all";

  // const fetchToken = async () => {
  //   const response = await fetch("/api/get-token");
  //   const data = await response.json();
  //   return data.token;
  // };

  const fetcher = async () => {
    const { accessToken } = await FetchToken();
    const props: GetAllServices = {
      apiUrl,
      token: accessToken.token,
    };
    const data = await GetAllService({ ...props });
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
    fetcher,
  };
}
