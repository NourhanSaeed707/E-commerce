import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Form, Input } from "antd";
import { Buttons, Generated_Code, Register } from "@/constants/auth";
import { IVerifyCodeModel } from "@/types/register";
import CountdownTimer from "../countdown/CountdownTimer";
import useCodeVerifyFacade from "@/hooks/auth/useCodeVerifyFacade";

const GenerateCode = () => {
  const [timeLeft, setTimeLeft] = useState<number>(120); // 120 seconds for 2 minutes
  const [disableResend, setDisableResend] = useState<boolean>(true);
  const router = useRouter();

  const { setVerifyModel, setUserDataForEmail, userRegisterVal } =
    useCodeVerifyFacade();

  const onFinish = (values: any) => {
    const verifyCodeModelVal: IVerifyCodeModel = {
      email: userRegisterVal?.email ? userRegisterVal?.email : "",
      code: values.code,
    };
    setVerifyModel(verifyCodeModelVal);
  };

  useEffect(() => {
    if (timeLeft == 0) {
      setDisableResend(false);
    }
  }, [timeLeft]);

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-1">{Register.REGSITER_TITLE}</h1>
      <h3 className="text-xs mb-4" style={{ color: "#FF7F7F" }}>
        {Generated_Code.SEND_GENERATE_CODE}
      </h3>
      <Form
        name="registration_form"
        onFinish={onFinish}
        initialValues={{ remember: true }}
      >
        <Form.Item
          name="code"
          rules={[
            { required: true, message: `${Generated_Code.REQUIRED_CODE}` },
          ]}
        >
          <Input placeholder={Generated_Code.GENERATE_CODE_PLACEHOLDER} />
        </Form.Item>
        <Form.Item>
          <div className="flex justify-between">
            <div
              className={`createNewAccStyle ${disableResend ? "disabled" : ""}`}
              onClick={() => {
                setUserDataForEmail(userRegisterVal);
                setTimeLeft(120);
                setDisableResend(true);
              }}
            >
              {Generated_Code.RESEND_CODE}
            </div>
          </div>
        </Form.Item>
        <div className="flex items-center justify-center">
          <CountdownTimer setTimeLeft={setTimeLeft} timeLeft={timeLeft} />
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full">
            {Buttons.REGISTER}
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
};

export default GenerateCode;
