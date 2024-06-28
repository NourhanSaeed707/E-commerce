import React, { useEffect } from "react";
import ProductFields from "./ProductFields";
import { Form } from "antd";
import { CategoryTypeEditProps } from "@/types/category";
import useAddEntity from "@/hooks/general-crud/useAddEntity";
import { Product } from "@/types/product";
import { useRouter } from "next/router";

export default function AddProduct() {
  const apiUrl = "/api/product/save";
  const props: CategoryTypeEditProps = {
    edit: false,
  };
  const { setEntity, loading, error, response } = useAddEntity(apiUrl);

  const [formRef] = Form.useForm();
  const router = useRouter();

  const onFinish = (values: any) => {
    console.log("vaaaaaalues: ", values);
    const product: Product = {
      name: values.name,
      codeNumber: values.codeNumber,
      price: values.price,
      stock: values.stock,
      gender: values.gender,
      categoryType: {
        id: values.categoryType
      },
      size: {
        size: values.size
      },
      color: {
        color: values.color
      },
      // size: {
      //   size: values.size
      // },
      // color: {
      //   color: values.color
      // },
    };
    setEntity(product);
  };

  useEffect(() => {
    if (!loading && !error && response) {
      router.push("/category-type/get-all");
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
