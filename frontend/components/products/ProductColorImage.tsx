import React, { useEffect, useState } from "react";
import ProductColorImageFields from "./ProductColorImageFields";
import {
  ProductColorImageProps,
  ProductColorImgFieldsProps,
} from "@/types/product";
import { useRouter } from "next/router";
import { Form } from "antd";
import useAddEntity from "@/hooks/general-crud/useAddEntity";
import { Image } from "@/types/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastMessage } from "@/constants/product";

export default function ProductColorImage() {
  const apiUrl = "/api/product/save/color-image";
  const router = useRouter();
  const [formRef] = Form.useForm();
  const [imagesList, setImagesList] = useState<Image[]>([]);
  const { id } = router.query;
  const { setEntity, loading, error, response } = useAddEntity(apiUrl);

  const props: ProductColorImgFieldsProps = {
    edit: false,
    imagesList,
    setImagesList,
  };

  useEffect(() => {
    setImagesList([]);
  }, [id]);

  const onFinish = (values: any) => {
    const productColorImages: ProductColorImageProps = {
      productId: Number(id),
      colorId: Number(values.color),
      images: imagesList,
    };
    setEntity(productColorImages);
    setImagesList([]);
  };

  useEffect(() => {
    if (!loading && !error && response) {
      formRef.resetFields();
      setImagesList([]);
      toast.success(`${ToastMessage.SUCCESS_PRODUCT_COLOR_IMG}`);
    }
  }, [response, error, loading, formRef]);

  return (
    <div>
      <Form
        name="add_product_color_img_form"
        onFinish={onFinish}
        form={formRef}
      >
        <ProductColorImageFields {...props} />
      </Form>
      <ToastContainer />
    </div>
  );
}
