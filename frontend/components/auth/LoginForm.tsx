import React from "react";
import { Button, Form, Input } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Buttons, Login, Register } from "@/constants/auth";
import { registerRequired, registerValid } from "@/constants/error";
import "react-phone-input-2/lib/style.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { LoginUser } from "@/types/users";

function LoginForm() {
  const router = useRouter();
  const { login, isSubmitting } = useAuth();

  const onFinish = (values: LoginUser) => {
    login(values);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-4">{Buttons.Signin}</h1>
      <Form
        name="registration_form"
        onFinish={onFinish}
        initialValues={{ remember: true }}
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: `${registerRequired.EMAIL_REQUIRED}` },
            { type: "email", message: `${registerValid.EMAIL_VALID}` },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder={Register.PLACEHOLDER_EMAIL}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: `${registerRequired.PASSWORD_REQUIRED}`,
            },
            { min: 8, message: `${registerValid.PASSWORD_VALID}` },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder={Register.PLACEHOLDER_PASSWORD}
          />
        </Form.Item>
        <Form.Item>
          <div className="flex justify-between">
            <Link href="/auth/register" className="createNewAccStyle">
              {Login.CREATE_NEW_ACCOUNT}
            </Link>
            <Link href="/forgot-password" className="forgotPasswordStyle">
              {Login.FORGOT_PASSWORD}
            </Link>
          </div>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            {Buttons.Signin}
          </Button>
          <Button
            type="default"
            className="mt-3 w-full"
            onClick={() => router.push("/")}
          >
            {Buttons.CANCEL}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginForm;
