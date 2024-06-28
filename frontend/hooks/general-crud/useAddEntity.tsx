import FetchToken from "@/helper/token";
import { AddService } from "@/services/general/addService";
import { AddServices } from "@/types/services";
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { getCookie } from "typescript-cookie";

export default function useAddEntity<T>(apiUrl: string) {
  // const token = getCookie("token");
  // const { token } = await FetchToken();
  const [entity, setEntity] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<AxiosResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tokenState, setToken] = useState<string | null>(null);

  const callAPI = useCallback(
    async (body: T) => {
      setError(null);
      setLoading(true);
      const props: AddServices = {
        apiUrl,
        token: tokenState,
        body,
      };
      console.log("proooooops: ", props);

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
      console.log("tokeeeeeeen inside add entity: ", tokenState);
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
