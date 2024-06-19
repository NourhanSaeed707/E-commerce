import React from "react";
import RegisterForm from "./RegisterForm";
import { Form } from "antd";
import { IRegisterForm } from "@/types/register";
import { UserType } from "@/types/users";
import useRegisterFacade from "@/hooks/auth/useRegisterFacade";

function Register() {
  const { sendEmailAndRedirect } = useRegisterFacade();

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
