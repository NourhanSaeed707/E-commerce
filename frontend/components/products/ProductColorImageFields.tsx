import { Form, Select } from "antd";
import React from "react";
import ImageUpload from "../upload/ImageUpload";
import { AddProductRequired } from "@/constants/product";
import useAddFacade from "@/hooks/products/useAddFacade";

export default function ProductColorImageFields({imagesList, setImagesList}) {
  const {  colorsEntities } = useAddFacade();

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
    </>
  );
}
