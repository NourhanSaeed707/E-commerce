import { Form } from "antd";
import React, { useEffect, useState } from "react";
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
import { Size } from "@/types/size";
import { Color } from "@/types/color";

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

  const { editProduct, entity } = useEditFacade(editFacadeProps);

  const onFinish = (values: any) => {
    // const sizes: Size[] =  values.size?.map((sizeId) => ({ id: sizeId.value }));
    let sizes: Size[] =
      values &&
      values.size &&
      values.size.map((size: any) => ({
        id: Number(size.value),
      }));
    
    const colors: Color[] = [{ id: values.color }];
    const productVal: ProductForm = {
      id: Number(id),
      name: values.name,
      codeNumber: values.codeNumber,
      price: values.price,
      stock: values.stock,
      gender: values.gender,
      categoryType: {
        id: values.categoryType,
      },

      size: sizes,
      color: colors,
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
