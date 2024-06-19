import { Buttons } from "@/constants/product";
import { AddProductRequired } from "@/constants/product";
import { Gender } from "@/types/gender";
import { Button, Form, Input, Select } from "antd";
import { useRouter } from "next/router";
import React from "react";

type ProductFieldsProps = {
  handleChangeSelectGender: (values: any) => void;
  // formRef: any;
};

export default function ProductFields({
  handleChangeSelectGender,
}: ProductFieldsProps) {
  const router = useRouter();
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <Form.Item
        name="name"
        label="name"
        rules={[
          {
            required: true,
            message: `${AddProductRequired.NAME_REQUIRED}`,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="codeNumber"
        label="Code Number"
        rules={[
          {
            required: true,
            message: `${AddProductRequired.CODE_NUMBER_REQUIRED}`,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="price"
        label="Price"
        rules={[
          {
            required: true,
            message: `${AddProductRequired.PRICE_REQUIRED}`,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="stock"
        label="Stock"
        rules={[
          {
            required: true,
            message: `${AddProductRequired.STOCK_REQUIRED}`,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="gender"
        label="Gender"
        rules={[
          {
            required: true,
            message: `${AddProductRequired.STOCK_REQUIRED}`,
          },
        ]}
      >
        <Select
          defaultValue=""
          style={{ width: 120 }}
          onChange={handleChangeSelectGender}
          options={[
            { value: Gender.Women, label: Gender.Women },
            { value: Gender.Male, label: Gender.Male },
            { value: Gender.Both, label: Gender.Both },
          ]}
        />
      </Form.Item>

      <Form.Item
        name="category"
        label="Category"
        rules={[
          {
            required: true,
            message: `${AddProductRequired.CATEGORY_REQUIRED}`,
          },
        ]}
      >
        <Select
          defaultValue=""
          style={{ width: 120 }}
          onChange={handleChangeSelectGender}
          options={[
            { value: "", label: "" },
            { value: "FEMALE", label: "Female" },
            { value: "MALE", label: "Male" },
            { value: "BOTH", label: "Both" },
          ]}
        />
      </Form.Item>
      <Form.Item
        name="size"
        label="Size"
        rules={[
          {
            required: true,
            message: `${AddProductRequired.SIZE_RQUIRED}`,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="color"
        label="Color"
        rules={[
          {
            required: true,
            message: `${AddProductRequired.COLOR_RQUIRED}`,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full">
          {Buttons.ADD}
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
