import { Form } from "antd";
import React, { useState } from "react";
import ProductFields from "./ProductFields";
import { useRouter } from "next/router";
import {
  AddProductFieldsProps,
  EditProductFacadeProps,
  EditProductFieldsProps,
  ProductForm,
} from "@/types/product";
import useEditFacade from "@/hooks/products/useEditFacade";
import { Image } from "@/types/image";

export default function EditProducts() {
  const [imagesList, setImagesList] = useState<Image[]>([]);
  const [formRef] = Form.useForm();
  const router = useRouter();
  const { id } = router.query;

  const props: EditProductFieldsProps = {
    edit: true,
    imagesList,
    setImagesList,
    
  };

  const editFacadeProps: EditProductFacadeProps = {
    id: Number(id),
    formRef,
    listingImages: imagesList,
    setListingImages: setImagesList,
  };

  const { editProduct } = useEditFacade(editFacadeProps);

  const onFinish = (values: any) => {
    const productVal: ProductForm = {
      name: values.name,
      codeNumber: values.codeNumber,
      price: values.price,
      stock: values.stock,
      gender: values.gender,
      categoryType: {
        id: values.categoryType,
      },
      images: imagesList,
    };
    editProduct(productVal);
  };

  return (
    <div>
      <Form name="edit_product_form" onFinish={onFinish} form={formRef}>
        <ProductFields {...props} />
      </Form>
    </div>
  );
}
