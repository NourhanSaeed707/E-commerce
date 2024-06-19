import { Form } from "antd";
import React from "react";
import CategoryFields from "./CategoryFields";
import { CategoryType } from "@/types/category";
import useAddCategoryType from "@/hooks/category-type/useAddCategoryType";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";

export default function AddCategory() {
  const router = useRouter();
  const [formRef] = Form.useForm();
  const {
    setCategoryType,
    errorCategoryType,
    loadingCategoryType,
    categoryTypeResposne,
  } = useAddCategoryType();

  const storeAndRedirect = (categoryType: CategoryType) => {
    setCategoryType(categoryType);
    if (!loadingCategoryType && !errorCategoryType && categoryTypeResposne) {
      toast.success("Category type added successfully")
      router.push("/");
    }
  };

  const onFinish = (values: any) => {
    const categoryTypeVal: CategoryType = {
      name: values.name,
    };
    storeAndRedirect(categoryTypeVal);
  };

  return (
    <Form name="add_product_form" onFinish={onFinish} form={formRef}>
      <CategoryFields />
    </Form>
  );
}
