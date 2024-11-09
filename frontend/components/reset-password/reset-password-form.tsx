import React from "react";
import { Form, Button, message } from "antd";
import ResetPasswordFields from "./reset-password-fields";

function ResetPasswordForm() {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log("values: ", values);
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
