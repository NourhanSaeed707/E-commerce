import { Button, Form, Select } from "antd";
import React from "react";
import ImageUpload from "../upload/ImageUpload";
import { AddProductRequired } from "@/constants/product";
import useAddFacade from "@/hooks/products/useAddFacade";
import { Buttons } from "@/constants/auth";
import { useRouter } from "next/router";
import { ProductColorImgFieldsProps } from "@/types/product";

export default function ProductColorImageFields({
  imagesList,
  setImagesList,
}: ProductColorImgFieldsProps) {
  const router = useRouter();
  const { colorsEntities } = useAddFacade();

  const optionsColor =
    colorsEntities &&
    colorsEntities.map((color) => ({
      value: color.id,
      label: color.color,
    }));

  return (
    <>
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
        <Select
          allowClear
          style={{ width: "100%" }}
          placeholder="Please select"
          options={optionsColor}
        />
      </Form.Item>
      <Form.Item name="images" label="image">
        <ImageUpload setImagesList={setImagesList} imagesList={imagesList} />
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
    </>
  );
}
