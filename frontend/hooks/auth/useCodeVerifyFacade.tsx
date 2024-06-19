import { useUserRegisterStore } from "@/context/RegisterUserContext";
import useSendEmail from "./useSendEmail";
import useVerifyCode from "./useVerifyCode";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import useRegister from "./useRegister";
import { LoginUser } from "@/types/users";

export default function useCodeVerifyFacade() {
  const {  userRegisterVal } = useUserRegisterStore();
  const { setUserDataForEmail } = useSendEmail();
  const { setVerifyModel, storeVerifyResponse } = useVerifyCode();
  const { login } = useAuth();
  const {
    setUserDataRegister,
    loadingRegister,
    storeRegisterResposne,
    errorRegister,
    isSubmiittingRegister,
  } = useRegister();

  useEffect(() => {
    if (
      storeVerifyResponse?.data === "generated code is right" &&
      storeVerifyResponse.status === 200
    ) {
      setUserDataRegister(userRegisterVal);
    }
  }, [setUserDataRegister, storeVerifyResponse, userRegisterVal]);

  useEffect(() => {
    if (!loadingRegister && !errorRegister && storeRegisterResposne && !isSubmiittingRegister) {
      const userLogin: LoginUser = {
        email: userRegisterVal ? userRegisterVal.email : "",
        password: userRegisterVal ? userRegisterVal.password : "",
      };
      login(userLogin);
    }
  }, [errorRegister, isSubmiittingRegister, loadingRegister, login, storeRegisterResposne, userRegisterVal]);


  return {
    setVerifyModel,
    userRegisterVal,
    setUserDataForEmail
  }
}
