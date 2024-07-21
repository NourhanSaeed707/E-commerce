import React, { useState } from "react";
import ProductColorImageFields from "./ProductColorImageFields";
import { AddProductFieldsProps } from "@/types/product";
import { useRouter } from "next/router";
import { Form } from "antd";
import useAddEntity from "@/hooks/general-crud/useAddEntity";

export default function ProductColorImage() {
  const apiUrl = "/api/product/save/color-image";
  const router = useRouter();
  const [formRef] = Form.useForm();
  const [imagesList, setImagesList] = useState([]);
  const { id } = router.query;
  const { setEntity, loading, error, response } = useAddEntity(apiUrl);


  const props: AddProductFieldsProps = {
    edit: false,
    imagesList,
    setImagesList,
  };

  const onFinish = (values: any) => {
    const productColorImages = {
      productId: id,
      color: values.color,
      images: imagesList,
    };
    console.log("vaaaaaaaalues: ", values);
    setEntity(productColorImages);
  };

  return (
    <div>
      <Form name="add_product_color_img_form" onFinish={onFinish} form={formRef}>
        <ProductColorImageFields {...props} />
      </Form>
    </div>
  );
}
