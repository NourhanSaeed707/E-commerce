import React, { useState } from "react";
import ProductColorImageFields from "./ProductColorImageFields";
import { AddProductFieldsProps } from "@/types/product";
import { useRouter } from "next/router";
import { Form } from "antd";

export default function ProductColorImage() {
  const router = useRouter();
  const [formRef] = Form.useForm();
  const [imagesList, setImagesList] = useState([]);
  const { id } = router.query;

  const props: AddProductFieldsProps = {
    edit: false,
    imagesList,
    setImagesList,
  };

  const onFinish = (values: any) => {
    
    const productColorImages = {
      color: values.color,
      images: imagesList,
    };
    console.log("vaaaaaaaalues: ", values);
    setEntity(product);
  };

  return (
    <div>
      <Form name="add_product_color_img_form" onFinish={onFinish} form={formRef}>
        <ProductColorImageFields {...props} />
      </Form>
    </div>
  );
}
