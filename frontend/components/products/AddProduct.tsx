import React, { useEffect, useState } from "react";
import ProductFields from "./ProductFields";
import { Form } from "antd";
import useAddEntity from "@/hooks/general-crud/useAddEntity";
import { AddProductFieldsProps, ProductForm } from "@/types/product";
import { useRouter } from "next/router";
import { Size } from "@/types/size";
import { Color } from "@/types/color";

export default function AddProduct() {
  const apiUrl = "/api/product/save";
  const [imagesList, setImagesList] = useState([]);
  const [formRef] = Form.useForm();
  const router = useRouter();

  const props: AddProductFieldsProps = {
    edit: false,
    imagesList,
    setImagesList,
  };
  const { setEntity, loading, error, response } = useAddEntity(apiUrl);

  const onFinish = (values: any) => {
    const sizes: Size[] =
      values &&
      values.size &&
      values.size.map((size: any) => ({
        id: Number(size),
        // size: size.size,
      }));
    // const colors: Color[] = values && values.color && values.color.map((color) => ({
    //   id: Number(color),
    // }));
    console.log("siiiiiiiiizes: ", sizes);
    // console.log("coloooooors: ", colors);
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
      // color: colors,
      images: imagesList,
    };
    console.log("vaaaaaaaalues: ", values);
    setEntity(product);
  };

  useEffect(() => {
    if (!loading && !error && response) {
      // router.push("/products/all");
      const id = response.data.id;
      router.push(`products/add-color/${id}`);
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
