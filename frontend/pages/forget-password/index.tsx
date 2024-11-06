import GenerateCode from "@/components/auth/generate-code";
import { useAuth } from "@/context/auth-context";
import useSendEmail from "@/hooks/auth/useSendEmail";
import React, { useEffect } from "react";

function ForgetPasswordPage() {
  const { setUserDataForEmail } = useSendEmail();
  const { email } = useAuth();

  useEffect(() => {
    console.log("insiiiiiiide useEffect funct");
    setUserDataForEmail({email: email});
  }, [email, setUserDataForEmail]);

  

  return <GenerateCode />;
}

export default ForgetPasswordPage;
