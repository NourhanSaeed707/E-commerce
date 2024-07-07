import FetchToken from "@/helper/token";
import { EditService } from "@/services/general/editService";
import { EditServices } from "@/types/services";
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";

export default function useEditEntity<T>(apiUrl: string) {
  const [entityId, setEntityId] = useState<Number | null>(null);
  const [updatedEntity, setUpdatedEntity] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<AxiosResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tokenState, setTokenState] = useState();

  const callAPI = useCallback(async (id: Number, body) => {
    setLoading(true);
    setError(null);
    const props: EditServices = {
      apiUrl,
      token: tokenState,
      id,
      body,
    };
    try {
      const response = await EditService<T>({ ...props });
      setResponse(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [apiUrl, tokenState]);

  useEffect(() => {
    const fetchToken = async () => {
      const { accessToken } = await FetchToken();
      setTokenState(accessToken.token);
    };
    fetchToken();
  }, []);


  useEffect(() => {
    if (entityId && updatedEntity) {
      callAPI(entityId, updatedEntity);
    }
  }, [callAPI, entityId, updatedEntity]);

  return {
    loading,
    error,
    response,
    setEntityId,
    setUpdatedEntity,
  };
}
