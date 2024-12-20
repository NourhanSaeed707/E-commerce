import { Form, Select } from "antd";
import React, { useEffect, useState } from "react";
import ImageUpload from "../upload/image-upload";
import { AddProductRequired } from "@/constants/product";
import useAddFacade from "@/hooks/products/useAddFacade";
import { useRouter } from "next/router";
import { ProductColorImgFieldsProps } from "@/types/product";
import AddCancelButton from "./add-cancel-button";
import { COLOR_PLACEHOLDER } from "@/constants/color";
import useGetColorImgFacade from "@/hooks/products/useGetColorImgFacade";
import { GetColorImgFacade } from "@/types/product-color";
import { Image } from "@/types/image";

export default function ProductColorImageFields({
  edit,
  color,
  imagesList,
  setImagesList,
}: ProductColorImgFieldsProps) {
  const router = useRouter();
  const { id: productId } = router.query;
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const { colorsEntities } = useAddFacade();

  const optionsColor =
    colorsEntities &&
    colorsEntities.map((color) => ({
      value: color.id,
      label: color.color,
    }));

  const handleColorChange = (value) => {
    setSelectedColor(Number(value));
  };

  const colorImgFacadeObj: GetColorImgFacade = {
    colorId: selectedColor,
    productId: Number(productId),
  };

  const { imageEntities } = useGetColorImgFacade(colorImgFacadeObj);

  useEffect(() => {
    if (selectedColor && imageEntities && edit) {
      setImagesList(imageEntities as Image[]);
    } else if (!imageEntities) {
      setImagesList([]);
    }
  }, [imageEntities, setImagesList, selectedColor, edit]);

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
          placeholder={
            edit
              ? `${COLOR_PLACEHOLDER.EDIT_SELECT_COLOR}`
              : `${COLOR_PLACEHOLDER.ADD_SELECT_COLOR}`
          }
          options={optionsColor}
          onChange={handleColorChange}
        />
      </Form.Item>
      <Form.Item name="images" label="image">
        <ImageUpload setImagesList={setImagesList} imagesList={imagesList} />
      </Form.Item>

      {!edit && <AddCancelButton edit={edit} />}
    </>
  );
}
