import React, { useEffect } from "react";
import ProductFields from "./product-fields";
import { Form } from "antd";
import useAddEntity from "@/hooks/general-crud/useAddEntity";
import { AddProductFieldsProps, ProductForm } from "@/types/product";
import { useRouter } from "next/router";
import { Size } from "@/types/size";

export default function AddProduct() {
  const apiUrl = "/api/product/save";
  const [formRef] = Form.useForm();
  const router = useRouter();

  const props: AddProductFieldsProps = {
    edit: false,
  };
  const { setEntity, loading, error, response } = useAddEntity(apiUrl);

  const onFinish = (values: any) => {
    const sizes: Size[] =
      values &&
      values.size &&
      values.size.map((size: any) => ({
        id: Number(size),
      }));
    const product: ProductForm = {
      name: values.name,
      codeNumber: values.codeNumber,
      price: values.price,
      stock: values.stock,
      gender: values.gender,
      categoryType: {
        id: values.categoryType,
      },
      size: sizes,
    };
    setEntity(product);
  };

  useEffect(() => {
    if (!loading && !error && response) {
      const id = response.data.id;
      router.push(`/products/add-color/${id}`);
    }
  }, [error, loading, response, router]);

  return (
    <div>
      <Form name="add_product_form" onFinish={onFinish} form={formRef}>
        <ProductFields {...props} />
      </Form>
    </div>
  );
}
