import { Form } from "antd";
import React from "react";
import CategoryFields from "./CategoryFields";
import { CategoryType } from "@/types/category";
import useAddCategoryType from "@/hooks/category-type/useAddCategoryType";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import useAddCategoryFacade from "@/hooks/category-type/useAddCategoryFacade";

export default function AddCategory() {
  const [formRef] = Form.useForm();
  const { addCategoryType } = useAddCategoryFacade();

  const onFinish = (values: any) => {
    const categoryTypeVal: CategoryType = {
      name: values.name,
    };
    addCategoryType(categoryTypeVal);
  };

  return (
    <Form name="add_product_form" onFinish={onFinish} form={formRef}>
      <CategoryFields />
    </Form>
  );
}
