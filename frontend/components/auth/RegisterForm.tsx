import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Buttons, Register } from "@/constants/auth";
import { registerRequired, registerValid } from "@/constants/error";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import countries from "world-countries";
import Flag from "react-flagkit";
import Select from "react-select";
import { useRouter } from "next/router";
import { IRegisterForm } from "@/types/register";
import useRegister from "@/hooks/auth/useRegister";
import { LoginUser, UserType } from "@/types/users";
import { useAuth } from "@/context/AuthContext";
import { useUserRegisterStore } from "@/context/RegisterUserContext";
import useSendEmail from "@/hooks/auth/useSendEmail";

function RegisterForm() {
  const router = useRouter();
  const { login } = useAuth();
  const { storeUser, userRegisterVal, setUserRegisterVal } =
    useUserRegisterStore();
  const { setUserDataForEmail } = useSendEmail();
  
  const {
    setUserData,
    userData,
    loading,
    isSubmiitting,
    error,
    storeResposne,
  } = useRegister();

  const countryOptions = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
    flag: country.cca2,
  }));

  const customStyles = {
    option: (provided: any, state: any) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
    }),
    singleValue: (provided: any, state: any) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
    }),
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
    storeUser(user);
    setUserDataForEmail(user);
    router.push("/auth/generate-code");
  };

  // useEffect(() => {

  //   if (!loading && !error && storeResposne && !isSubmiitting) {
  //     const userLogin: LoginUser = {
  //       email: userData ? userData.email : "",
  //       password: userData ? userData.password : "",
  //     };
  //     login(userLogin);
  //     router.push("/");
  //   }
  // }, [error, isSubmiitting, loading, login, router, storeResposne, userData]);

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-4">{Register.REGSITER_TITLE}</h1>
      <Form
        name="registration_form"
        onFinish={onFinish}
        initialValues={{ remember: true }}
      >
        <Form.Item
          name="firstName"
          rules={[
            {
              required: true,
              message: `${registerRequired.FIRST_NAME_REQUIRED}`,
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder={Register.PLACEHOLDER_FIRST_NAME}
          />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[
            {
              required: true,
              message: `${registerRequired.LAST_NAME_REQUIRED}`,
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder={Register.PLACEHOLDER_LAST_NAME}
          />
        </Form.Item>
        <Form.Item
          name="nationality"
          rules={[
            {
              required: true,
              message: `${registerRequired.NATIONALITY_REQUIRED}`,
            },
          ]}
        >
          <Select
            options={countryOptions}
            placeholder={Register.PLACEHOLDER_NATINOALITY}
            styles={customStyles}
            formatOptionLabel={(country) => (
              <div className="flex items-center">
                <Flag country={country.flag} className="mr-2" />
                <span>{country.label}</span>
              </div>
            )}
            isClearable={false} // Ensure the user cannot clear the selection
            isMulti={false} // Single-select mode
          />
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[
            { required: true, message: `${registerRequired.PHONE_REQUIRED}` },
          ]}
        >
          <PhoneInput
            country={"eg"}
            enableSearch={true}
            disableCountryCode={false}
            disableDropdown={false}
            enableAreaCodes={true}
            inputStyle={{ width: "100%" }}
            containerStyle={{ width: "100%" }}
            excludeCountries={["il"]}
            inputProps={{
              required: true,
              autoFocus: true,
              onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
                const input = e.currentTarget;
                if (input.selectionStart === 0 && input.selectionEnd === 0) {
                  e.preventDefault(); // Prevent deletion of the country code
                }
              },
            }}
            placeholder={Register.PLACEHOLDER_PHONE}
          />
        </Form.Item>
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
        <Form.Item
          name="confirmPassword"
          dependencies={["password"]}
          hasFeedback // to have feedBack icon
          rules={[
            {
              required: true,
              message: `${registerRequired.PASSWORD_REQUIRED}`,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(`${registerValid.CONFIRM_PASSWORD_VALID}`)
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder={Register.PLACEHOLDER_CONFIRM_PASSWORD}
          />
        </Form.Item>
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
}

export default RegisterForm;
