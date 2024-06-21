import { Form } from "antd";
import React, { useEffect } from "react";
import CategoryFields from "./CategoryFields";
import { CategoryType, CategoryTypeEditProps } from "@/types/category";
import { useRouter } from "next/router";
import useAddEntity from "@/hooks/general-crud/useAddEntity";

export default function AddCategory() {
  const apiUrl = "/api/category-type/save"; 
  const props : CategoryTypeEditProps = {
    edit: false,
  };
  const [formRef] = Form.useForm();
  const router = useRouter();

  const {
    setEntity,
    loading,
    response,
    error
  }  = useAddEntity(apiUrl);

  const onFinish = (values: any) => {
    const categoryTypeVal: CategoryType = {
      name: values.name,
    };
    setEntity(categoryTypeVal);
  };

  useEffect(() => {
    if (!loading && !error && response) {
      router.push("/category-type/get-all");
    }
  }, [error, loading, response, router]);

  return (
    <Form name="add_product_form" onFinish={onFinish} form={formRef}>
      <CategoryFields {...props} />
    </Form>
  );
}
