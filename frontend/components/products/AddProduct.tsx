import React, { useEffect, useState } from "react";
import ProductFields from "./ProductFields";
import { Form } from "antd";
import { CategoryTypeEditProps } from "@/types/category";
import useAddEntity from "@/hooks/general-crud/useAddEntity";
import { AddProductFieldsProps, Product } from "@/types/product";
import { useRouter } from "next/router";

export default function AddProduct() {
  const apiUrl = "/api/product/save";
  const [imagesList, setImagesList] = useState([]);
  // const props: CategoryTypeEditProps = {
  //   edit: false,
  // };
  const props: AddProductFieldsProps = {
    edit: false,
    imagesList,
    setImagesList,
  };
  const { setEntity, loading, error, response } = useAddEntity(apiUrl);

  const [formRef] = Form.useForm();
  const router = useRouter();

  useEffect(() => {
    console.log(
      "imaaaaaaages list in main add product component: ",
      imagesList
    );
  }, [imagesList]);

  const onFinish = (values: any) => {
    console.log("vaaaaaaalues: ", values);
    const product: Product = {
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
    console.log("prooooooduct: ", product);
    setEntity(product);
  };

  useEffect(() => {
    if (!loading && !error && response) {
      router.push("/products/all");
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
