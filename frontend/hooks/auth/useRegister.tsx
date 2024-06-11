import client from "@/client/client";
import { IRegisterModel } from "@/types/register";
import { UserType } from "@/types/users";
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { getCookie, setCookie } from "typescript-cookie";

export default function useRegister() {
  const apiUrl = "/api/v2/auth/register";
  const [userData, setUserData] = useState<UserType | null>(null);
  const [storeResposne, setStoreResponse] = useState<AxiosResponse | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [isSubmiitting, setIsSubmitting] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const callAPI = useCallback(async (newUser: UserType) => {
    setLoading(true);
    setIsSubmitting(true);
    setError(null);
    await client
      .post(apiUrl, newUser, {
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        if (res && res.data && res.data.token) {
          client.defaults.headers.common.Authorization = `Bearer ${res.data.token}`;
          setCookie("token", res.data.token, {
            expires: 1,
            secure: true,
          });
          setStoreResponse(res);
        }
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsSubmitting(false);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (userData) {
      callAPI(userData);
    }
  }, [userData, callAPI]);

  return {
    setUserData,
    userData,
    storeResposne,
    error,
    isSubmiitting,
    loading,
  };
}
