import { Button, Form, Select } from "antd";
import React from "react";
import ImageUpload from "../upload/ImageUpload";
import { AddProductRequired } from "@/constants/product";
import useAddFacade from "@/hooks/products/useAddFacade";
import { Buttons } from "@/constants/auth";
import { useRouter } from "next/router";
import { ProductColorImgFieldsProps } from "@/types/product";
import AddCancelButton from "./AddCancelButton";
import { COLOR_PLACEHOLDER } from "@/constants/color";

export default function ProductColorImageFields({
  edit,
  color,
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
          placeholder= {edit ? `${COLOR_PLACEHOLDER.EDIT_SELECT_COLOR}` : `${COLOR_PLACEHOLDER.ADD_SELECT_COLOR}`}
          options={optionsColor}
        />
      </Form.Item>
      <Form.Item name="images" label="image">
        <ImageUpload setImagesList={setImagesList} imagesList={imagesList} />
      </Form.Item>
      
      {!edit && <AddCancelButton edit={edit} />}
    </>
  );
}
