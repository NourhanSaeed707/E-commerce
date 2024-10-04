import { useEffect, useState } from "react";
import FetchToken from "@/helper/token";
import { GetAllService } from "@/services/general/getAllService";
import { GetAllServices } from "@/types/services";

export default function useGetAllProducts(apiUrl: string, paginated: boolean = true) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errors, setErrors] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { accessToken } = await FetchToken();
        const props: GetAllServices = {
          apiUrl,
          token: accessToken.token,
        };
        const result = await GetAllService({ ...props });
        setData(result);
      } catch (error: any) {
        setErrors(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]); 

  return {
    entities: paginated ? (data && data.content) || data : data,
    total: paginated ? data && data.totalElements : data && data.length,
    loading,
    errors,
  };
}
