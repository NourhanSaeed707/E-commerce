import client from "@/client/client";
import { IVerifyCodeModel } from "@/types/register";
import { UserType } from "@/types/users";
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";

export default function useVerifyCode() {
  const apiUrl = "/api/email/verify";
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [storeVerifyResponse, setVerifyStoreResponse] = useState<AxiosResponse | null>(
    null
  );
  const [userData, setUserData] = useState<UserType | null>(null);
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [verifyModel, setVerifyModel] = useState<IVerifyCodeModel | null> (null)

  const callApi = useCallback(async (verifyModel: IVerifyCodeModel) => {
    setLoading(true);
    console.log("insiiiiiiiiide verify hook: ", verifyModel);
    await client
      .post(apiUrl, verifyModel, {
        // body: {
        //   email: user.email,
        //   code: code,
        // },
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        console.log("resss veriffyyy: ", res);
        setVerifyStoreResponse(res);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    console.log("usssssssseeeeeeeeeffect");
    // if (userData && generatedCode) {
    //   callApi(userData, generatedCode);
    // }
    if (verifyModel) {
      console.log("veriiiiiiify model:");
      console.log(verifyModel)
      callApi(verifyModel);
    }
  }, [callApi, generatedCode, userData, verifyModel]);

  return {
    loading,
    error,
    storeVerifyResponse,
    setUserData,
    setGeneratedCode,
    setVerifyModel
  };
}
