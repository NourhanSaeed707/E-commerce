import React from "react";
import { Form, Button } from "antd";
import ResetPasswordFields from "./reset-password-fields";
import useResetPassword from "@/hooks/reset-password/useResetPassword";
import { useRouter } from "next/router";

function ResetPasswordForm() {
  const router = useRouter();
  const { setResetPassword } = useResetPassword();
  const [form] = Form.useForm();
  const { token } = router.query;
  const onFinish = (values) => {
    setResetPassword({
      token: token,
      newPassword: values.newPassword,
    });
  };

  return (
    <Form
      form={form}
      name="reset_password"
      onFinish={onFinish}
      layout="vertical"
    >
      <h3>Reset Password</h3>
      <ResetPasswordFields />
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Reset Password
        </Button>
      </Form.Item>
    </Form>
  );
}

export default ResetPasswordForm;
