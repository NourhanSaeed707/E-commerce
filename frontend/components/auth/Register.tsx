import React from "react";
import RegisterForm from "./RegisterForm";
import { Form } from "antd";
import useSendEmail from "@/hooks/auth/useSendEmail";
import { useUserRegisterStore } from "@/context/RegisterUserContext";
import { useRouter } from "next/router";
import { IRegisterForm } from "@/types/register";
import { UserType } from "@/types/users";

function Register() {
  const router = useRouter();
  const { storeUser } = useUserRegisterStore();
  const { setUserDataForEmail } = useSendEmail();

  const sendEmailAndRedirect = (user: UserType) => {
    storeUser(user);
    setUserDataForEmail(user);
    router.push("/auth/generate-code");
  };

  const onFinish = (values: IRegisterForm) => {
    const user: UserType = {
      firstName: values.firstName,
      lastName: values.lastName,
      nationality: values.nationality.label,
      mobile: values.phone,
      email: values.email,
      password: values.password,
    };
    sendEmailAndRedirect(user);
  };

  return (
    <div>
      <Form
        name="registration_form"
        onFinish={onFinish}
        initialValues={{ remember: true }}
      >
        <RegisterForm />
      </Form>
    </div>
  );
}

export default Register;
