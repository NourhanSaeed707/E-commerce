import client from "@/client/client";
import { UserType } from "@/types/users";
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";

export default function useSendEmail() {
  const apiUrl = "/api/email/send";
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [storeResponse, setStoreResponse] = useState<AxiosResponse | null>(
    null
  );
  const [userDataForEmail, setUserDataForEmail] = useState<UserType | null>(
    null
  );

  const callApi = useCallback(async (user: UserType) => {
    setLoading(true);
    await client
      .post(apiUrl, user, {
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        setStoreResponse(res);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (userDataForEmail) {
      callApi(userDataForEmail);
    }
  }, [callApi, userDataForEmail]);

  return {
    storeResponse,
    error,
    setUserDataForEmail,
    loading,
  };
}
