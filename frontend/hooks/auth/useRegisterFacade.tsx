import { useUserRegisterStore } from "@/context/RegisterUserContext";
import { useRouter } from "next/router";
import useSendEmail from "./useSendEmail";
import { UserType } from "@/types/users";
import { useCallback } from "react";

export default function useRegisterFacade() {
  const router = useRouter();
  const { storeUser } = useUserRegisterStore();
  const { setUserDataForEmail } = useSendEmail();

  const sendEmailAndRedirect = useCallback(
    (user: UserType) => {
      storeUser(user);
      setUserDataForEmail(user);
      router.push("/auth/generate-code");
    },
    [router, setUserDataForEmail, storeUser]
  );

  return {
    sendEmailAndRedirect,
  };
}
