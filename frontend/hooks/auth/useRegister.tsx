import client from "@/client/client";
import { IRegisterModel } from "@/types/register";
import { UserType } from "@/types/users";
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { getCookie, setCookie } from "typescript-cookie";

export default function useRegister() {
  const apiUrl = "/api/v2/auth/register";
  const [userDataRegister, setUserDataRegister] = useState<UserType | null>(null);
  const [storeRegisterResposne, setStoreRegisterResponse] = useState<AxiosResponse | null>(
    null
  );
  const [errorRegister, setErrorRegister] = useState<string | null>(null);
  const [isSubmiittingRegister, setIsSubmittingResgiter] = useState<boolean>(false);
  const [loadingRegister, setLoadingRegister] = useState<boolean>(false);

  const callAPI = useCallback(async (newUser: UserType) => {
    setLoadingRegister(true);
    setIsSubmittingResgiter(true);
    setErrorRegister(null);
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
          setStoreRegisterResponse(res);
        }
      })
      .catch((err) => {
        setErrorRegister(err);
      })
      .finally(() => {
        setIsSubmittingResgiter(false);
        setLoadingRegister(false);
      });
  }, []);

  useEffect(() => {
    if (userDataRegister) {
      callAPI(userDataRegister);
    }
  }, [userDataRegister, callAPI]);

  return {
    setUserDataRegister,
    userDataRegister,
    storeRegisterResposne,
    errorRegister,
    isSubmiittingRegister,
    loadingRegister,
  };
}
