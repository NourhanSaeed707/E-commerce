import { useAuth } from "@/context/auth-context";
import useSendEmailForget from "@/hooks/reset-password/useSendEmailForget";
import React, { useEffect } from "react";

function ForgetPasswordPage() {
  const { email } = useAuth();
  const { setUserDataForEmail, setEmail } = useSendEmailForget();

  useEffect(() => {
    console.log("insiiiiiide send email forget password");
    setUserDataForEmail({email: email});
  }, [email, setUserDataForEmail]);

  return <div>We will send you message so you can change you password</div>;
}

export default ForgetPasswordPage;
