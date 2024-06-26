import { Validation } from "@/constants/error";
import { Buttons } from "@/constants/product";
import { AddProductRequired } from "@/constants/product";
import useAddFacade from "@/hooks/products/useAddFacade";
import { CategoryType } from "@/types/category";
import { Gender } from "@/types/gender";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ImageUpload from "../upload/ImageUpload";
import { UploadImageProps } from "@/types/image";

type ProductFieldsProps = {
  // handleChangeSelectGender: (values: any) => void;
  // formRef: any;
};

export default function ProductFields({ edit, imagesList, setImagesList }) {
  // const [imagesList, setImagesList] = useState([]);
  const router = useRouter();
  const { categoryTypes } = useAddFacade();

  // const handleAddImage = (newImageUrl: string) => {
  //   const newImage = newImageUrl;
  //   if (imagesList) {
  //     setImagesList([...imagesList, newImage]);
  //   } else {
  //     setImagesList([newImage]);
  //   }
  // };
  // const handleRemoveImage = (deleteImageUrl: string) => {
  //   const newImagesList = imagesList.filter(
  //     (image) => image.url !== deleteImageUrl
  //   );
  //   setImagesList([...newImagesList]);
  // };

  // const props: UploadImageProps = {
  //   size: 16,
  //   imagesList,
  //   addImage: handleAddImage,
  //   removeImage: handleRemoveImage,
  // };
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
          // onChange={handleChangeSelectGender}
          options={[
            { value: Gender.Women, label: Gender.Women },
            { value: Gender.Male, label: Gender.Male },
            { value: Gender.Both, label: Gender.Both },
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
          // onChange={handleChangeSelectGender}
          options={
            categoryTypes &&
            categoryTypes.map((category: CategoryType) => ({
              value: category.id,
              label: category.name,
            }))
          }
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
          // {
          //   type: "number",
          //   message: `${Validation.ONLY_NUMBERS}`,
          // },
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
      <Form.Item name = "images" label="image">
        {/* <ImageUpload  {...props}/> */}
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
    </div>
  );
}
