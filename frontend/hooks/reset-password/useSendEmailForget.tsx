import client from "@/client/client";
import { UserType, UserTypeOption } from "@/types/users";
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";

export default function useSendEmailForget() {
  const apiUrl = "/api/auth/send-forget-password";
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [storeResponse, setStoreResponse] = useState<AxiosResponse | null>(
    null
  );
  const [userDataForEmail, setUserDataForEmail] =
    useState<UserTypeOption | null>(null);
  const [email, setEmail] = useState<String | null>(null);

  const callApi = useCallback(async (user: UserTypeOption) => {
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
      console.log("user daataa: ", userDataForEmail);
      callApi(userDataForEmail);
    }
  }, [callApi, userDataForEmail]);

  return {
    storeResponse,
    error,
    setUserDataForEmail,
    loading,
    setEmail,
  };
}
