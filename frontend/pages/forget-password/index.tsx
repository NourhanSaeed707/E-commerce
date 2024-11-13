import { useAuth } from "@/context/auth-context";
import useSendEmailForget from "@/hooks/reset-password/useSendEmailForget";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function ForgetPasswordPage() {
  const { email } = useAuth();
  const { setUserDataForEmail, setEmail } = useSendEmailForget();
  const router = useRouter();
  const { emailVal } = router.query;

  useEffect(() => {
    setUserDataForEmail({email: email});
  }, [email, setUserDataForEmail]);

  useEffect(() => {
    if(typeof emailVal === "string") {
      setUserDataForEmail({email: emailVal});
    }
  }, [emailVal, setUserDataForEmail])

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Password Reset
        </h2>
        <p className="text-gray-600">
          We will send you an email with instructions to reset your password.
        </p>
      </div>
    </div>
  );
}

export default ForgetPasswordPage;
