import React from "react";
import { Button, Form, Input } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Buttons, Register } from "@/constants/auth";
import { registerRequired, registerValid } from "@/constants/error";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import countries from "world-countries";
import Flag from "react-flagkit";
import Select from "react-select";
import { useRouter } from "next/router";

function RegisterForm() {
  const router = useRouter();

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

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-4">{Register.REGSITER_TITLE}</h1>
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
    </div>
  );
}

export default RegisterForm;
