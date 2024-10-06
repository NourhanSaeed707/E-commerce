import { Validation } from "@/constants/error";
import { AddProductRequired } from "@/constants/product";
import useAddFacade from "@/hooks/products/useAddFacade";
import { CategoryType } from "@/types/category";
import { Gender } from "@/types/gender";
import {  Form, Input, InputNumber, Select } from "antd";
import React from "react";
import AddCancelButton from "./add-cancel-button";
import ProductColorImageFields from "./product-color-imag-fields";
import { Image } from "@/types/image";

interface ProductFieldsProps {
  edit: boolean;
  imagesList?: Image[];
  setImagesList?: React.Dispatch<React.SetStateAction<Image[]>>;
}

export default function ProductFields({
  edit,
  imagesList,
  setImagesList,
}: ProductFieldsProps) {
  const { categoryTypeEntities, sizeEntities } = useAddFacade();

  const optionsCategoryType =
    categoryTypeEntities &&
    categoryTypeEntities.map((category: CategoryType) => ({
      value: category.id,
      label: category.name,
    }));

  const optionsSize =
    sizeEntities &&
    sizeEntities.map((size) => ({
      value: size.id,
      label: size.size,
    }));

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
          // {
          //   validator: (_, value) => {
          //     const onlyLetters = /^[A-Za-z]+$/;
          //     if (onlyLetters.test(value)) {
          //       return Promise.resolve();
          //     }
          //     return Promise.reject(new Error(`${Validation.ONLY_STRING}`));
          //   },
          // },
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
          {
            type: "number",
            message: `${Validation.ONLY_NUMBERS}`,
          },
        ]}
      >
        <InputNumber min={1} />
      </Form.Item>
      <Form.Item
        name="stock"
        label="Stock"
        rules={[
          {
            required: true,
            message: `${AddProductRequired.STOCK_REQUIRED}`,
          },
          {
            type: "number",
            message: `${Validation.ONLY_NUMBERS}`,
          },
        ]}
      >
        <InputNumber min={0} />
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
          options={[
            { value: Gender.Women, label: "Women" },
            { value: Gender.Male, label: "Male" },
            { value: Gender.Both, label: "Both" },
          ]}
        />
      </Form.Item>

      <Form.Item
        name="categoryType"
        label="Category Type"
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
          options={optionsCategoryType}
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
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Please select"
          options={optionsSize}
        />
      </Form.Item>

      {edit && (
        <ProductColorImageFields
          edit={true}
          imagesList={imagesList}
          setImagesList={setImagesList}
        />
      )}
      <AddCancelButton edit={edit} />
    </div>
  );
}
