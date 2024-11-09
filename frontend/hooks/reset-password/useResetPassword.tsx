import client from "@/client/client";
import { ResetPasswordBody } from "@/types/reset-password";
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";

export default function useResetPassword() {
  const apiUrl = "/api/auth/reset-password";
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [storeResponse, setStoreResponse] = useState<AxiosResponse | null>(
    null
  );
  const [resetPassword, setResetPassword] = useState<ResetPasswordBody | null>(
    null
  );

  const callApi = useCallback(async (resetPassword: ResetPasswordBody) => {
    setLoading(true);
    await client
      .post(apiUrl, resetPassword, {
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
    if (resetPassword) {
      callApi(resetPassword);
    }
  }, [callApi, resetPassword]);

  return {
    error,
    loading,
    storeResponse,
    setResetPassword,
  };
}
