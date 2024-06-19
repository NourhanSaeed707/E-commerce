
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useUserRegisterStore } from "@/context/RegisterUserContext";
import { Button, Form, Input } from "antd";
import { Buttons, Generated_Code, Register } from "@/constants/auth";
import useVerifyCode from "@/hooks/auth/useVerifyCode";
import { IVerifyCodeModel } from "@/types/register";
import useSendEmail from "@/hooks/auth/useSendEmail";
import CountdownTimer from "../countdown/CountdownTimer";
import { useAuth } from "@/context/AuthContext";
import { LoginUser } from "@/types/users";
import useRegister from "@/hooks/auth/useRegister";

const GenerateCode = () => {
  const { storeUser, userRegisterVal } = useUserRegisterStore();
  const { setUserDataForEmail } = useSendEmail();
  const { setVerifyModel, storeVerifyResponse } = useVerifyCode();
  const [timeLeft, setTimeLeft] = useState<number>(120); // 120 seconds for 2 minutes
  const [disableResend, setDisableResend] = useState<boolean>(true);
  const router = useRouter();
  const { login } = useAuth();
  const {
    setUserDataRegister,
    loadingRegister,
    storeRegisterResposne,
    errorRegister,
    isSubmiittingRegister
  } = useRegister();

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

  useEffect(() => {
    if (
      storeVerifyResponse?.data === "generated code is right" &&
      storeVerifyResponse.status === 200
    ) {
      setUserDataRegister(userRegisterVal);
    }
  }, [setUserDataRegister, storeVerifyResponse, userRegisterVal]);

  useEffect(() => {
    if (!loadingRegister && !errorRegister && storeRegisterResposne && !isSubmiittingRegister) {
      const userLogin: LoginUser = {
        email: userRegisterVal ? userRegisterVal.email : "",
        password: userRegisterVal ? userRegisterVal.password : "",
      };
      login(userLogin);
    }
  }, [errorRegister, isSubmiittingRegister, loadingRegister, login, storeRegisterResposne, userRegisterVal]);

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
