import { Buttons } from "@/constants/auth";
import { AddColorRequired } from "@/constants/color";
import { Validation } from "@/constants/error";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/router";
import React from "react";
import ProductColorImageFields from "../products/product-color-imag-fields";
import ImageUpload from "../upload/image-upload";

export default function ColorFields({ edit, imageUrl, setImageUrl }) {
  const router = useRouter();

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <Form.Item
        name="color"
        label="color"
        rules={[
          {
            required: true,
            message: `${AddColorRequired.COLOR_REQUIRED}`,
          },
          {
            validator: (_, value) => {
              const onlyLetters = /^[A-Za-z]+$/;
              if (onlyLetters.test(value)) {
                return Promise.resolve();
              }
              return Promise.reject(new Error(`${Validation.ONLY_STRING}`));
            },
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="images" label="image">
        <ImageUpload setImagesList={setImageUrl} imagesList={imageUrl} />
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
