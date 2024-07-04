import { Form } from "antd";
import React, { useState } from "react";
import ProductFields from "./ProductFields";
import { useRouter } from "next/router";
import { AddProductFieldsProps, Product } from "@/types/product";
import useEditFacade from "@/hooks/products/useEditFacade";
import { editFacadeProps } from "@/types/category";

export default function EditProducts() {
  const [imagesList, setImagesList] = useState([]);
  const [formRef] = Form.useForm();
  const router = useRouter();
  const { id } = router.query;

  const props: AddProductFieldsProps = {
    edit: false,
    imagesList,
    setImagesList,
  };

  const editFacadeProps: editFacadeProps = {
    id: Number(id),
    formRef,
  };

  const { editProduct } = useEditFacade(editFacadeProps);

  const onFinish = (values: any) => {
    const productVal: Product = {
      name: values.name,
      codeNumber: values.codeNumber,
      price: values.price,
      stock: values.stock,
      gender: values.gender,
      categoryType: {
        id: values.categoryType,
      },
      size: {
        size: values.size,
      },
      color: {
        color: values.color,
      },
      images: imagesList,
    };
    editProduct(productVal);
  };

  return (
    <div>
      <Form name="add_product_form" onFinish={onFinish} form={formRef}>
        <ProductFields {...props} />
      </Form>
    </div>
  );
}
