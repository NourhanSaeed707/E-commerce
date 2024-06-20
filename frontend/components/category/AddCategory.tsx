import { Form } from "antd";
import React, { useEffect } from "react";
import CategoryFields from "./CategoryFields";
import { CategoryType } from "@/types/category";
import useAddCategoryType from "@/hooks/category-type/useAddCategoryType";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

export default function AddCategory() {
  const [formRef] = Form.useForm();
  const router = useRouter();
  const {
    setCategoryType,
    errorCategoryType,
    loadingCategoryType,
    categoryTypeResposne,
  } = useAddCategoryType();

  const onFinish = (values: any) => {
    const categoryTypeVal: CategoryType = {
      name: values.name,
    };
    setCategoryType(categoryTypeVal);
  };

  useEffect(() => {
    if (!loadingCategoryType && !errorCategoryType && categoryTypeResposne) {
      toast.success("Category type added successfully");
      router.push("/category-type/get-all");
    }
  }, [categoryTypeResposne, errorCategoryType, loadingCategoryType, router]);

  return (
    <Form name="add_product_form" onFinish={onFinish} form={formRef}>
      <CategoryFields />
    </Form>
  );
}
