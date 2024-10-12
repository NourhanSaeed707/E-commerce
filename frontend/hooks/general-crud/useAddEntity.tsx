import FetchToken from "@/helper/token";
import { AddService } from "@/services/general/addService";
import { AddServices } from "@/types/services";
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";

export default function useAddEntity<T>(apiUrl: string) {
  const [entity, setEntity] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<AxiosResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tokenState, setToken] = useState<string | null>(null);

  const callAPI = useCallback(
    async (body: T) => {
      console.log("tooooooooooke state: ", tokenState);
      setError(null);
      setLoading(true);
      const props: AddServices = {
        apiUrl,
        token: tokenState,
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
    [apiUrl, tokenState]
  );

  useEffect(() => {
    if (entity && tokenState) {
      callAPI(entity);
    }
  }, [callAPI, entity, tokenState]);

  useEffect(() => {
    const fetchToken = async () => {
      const { accessToken } = await FetchToken();
      setToken(accessToken.token);
    };
    fetchToken();
  }, []);

  return {
    response,
    error,
    loading,
    setEntity,
  };
}
