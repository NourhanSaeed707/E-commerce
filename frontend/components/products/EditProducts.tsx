import { Form } from "antd";
import React, { useEffect, useState } from "react";
import ProductFields from "./ProductFields";
import { useRouter } from "next/router";
import {
  AddProductFieldsProps,
  editProductFacadeProps,
  Product,
} from "@/types/product";
import useEditFacade from "@/hooks/products/useEditFacade";
import { Image } from "@/types/image";
import { Gender } from "@/types/gender";

export default function EditProducts() {
  const [imagesList, setImagesList] = useState<Image[]>([]);
  const [formRef] = Form.useForm();
  const router = useRouter();
  const { id } = router.query;

  const props: AddProductFieldsProps = {
    edit: false,
    imagesList,
    setImagesList,
  };

  const editFacadeProps: editProductFacadeProps = {
    id: Number(id),
    formRef,
    listingImages: imagesList,
    setListingImages: setImagesList,
  };

  const { editProduct, listingImages } = useEditFacade(editFacadeProps);

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
  useEffect(() => {
    console.log("liiiiiiisting image: ", listingImages);
  }, [listingImages]);

  useEffect(() => {
    setImagesList(listingImages);
  }, [listingImages]);

  return (
    <div>
      <Form name="edit_product_form" onFinish={onFinish} form={formRef}>
        <ProductFields {...props} />
      </Form>
    </div>
  );
}
