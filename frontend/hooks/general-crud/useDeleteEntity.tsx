import FetchToken from "@/helper/token";
import { DeleteService } from "@/services/general/deleteService";
import { DeleteAndGetOneServices } from "@/types/services";
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";

export default function useDeleteEntity<T>(apiUrl: string) {
  const [entityId, setEntityId] = useState<Number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<AxiosResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tokenState, setToken] = useState<string | null>(null);

  const callAPI = useCallback(async (id: Number) => {
    setLoading(true);
    const props: DeleteAndGetOneServices = {
      apiUrl,
      token: tokenState,
      id,
    };
    try {
      const response = await DeleteService({ ...props });
      setResponse(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl, tokenState]);

  useEffect(() => {
    if (entityId) {
      callAPI(entityId);
    }
  }, [callAPI, entityId]);

  useEffect(() => {
    const fetchToken = async () => {
      const { accessToken } = await FetchToken();
      setToken(accessToken.token);
    };
    fetchToken();
  }, []);

  return {
    loading,
    response,
    error,
    setEntityId,
    entityId,
  };
}
