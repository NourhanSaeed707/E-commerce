import { Buttons } from "@/constants/auth";
import { CategoryType } from "@/constants/category";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/router";
import React from "react";

export default function CategoryFields() {
  const router = useRouter();
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-semibold mb-5">{CategoryType.CATEGORY_TYPE}</h1>
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: `${CategoryType.TYPE}`,
          },
        ]}
      >
        <Input placeholder={CategoryType.TYPE}/>
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
