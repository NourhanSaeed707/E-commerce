import { AddService } from "@/services/general/addService";
import { AddServices } from "@/types/services";
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { getCookie } from "typescript-cookie";

export default function useAddEntity<T>(apiUrl: string) {
  const token = getCookie("token");
  const [entity, setEntity] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<AxiosResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const callAPI = useCallback(
    async (body: T) => {
      setError(null);
      setLoading(true);
      const props: AddServices = {
        apiUrl,
        token,
        body,
      };

      try {
        const response = await AddService(props);
        setResponse(response);
      } catch (error) {
        setError(error as string);
      } finally {
        setLoading(false);
      }
    },
    [apiUrl, token]
  );

  useEffect(() => {
    if (entity) {
      callAPI(entity);
    }
  }, [callAPI, entity]);

  return {
    response,
    error,
    loading,
    setEntity,
  };
}
