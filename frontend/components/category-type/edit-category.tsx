import React from "react";
import CategoryFields from "./category-fields";
import { Form } from "antd";
import { useRouter } from "next/router";
import {
  CategoryType,
  CategoryTypeEditProps,
  editFacadeProps,
} from "@/types/category";
import useEditFacade from "@/hooks/category-type/useEditFacade";

export default function EditCategory() {
  const [formRef] = Form.useForm();
  const router = useRouter();
  const { id } = router.query;

  const props: CategoryTypeEditProps = {
    edit: true,
  };
  const editFacadeProps: editFacadeProps = {
    id: Number(id),
    formRef,
  };

  const { editCategoryType } = useEditFacade(editFacadeProps);

  const onFinish = (values: any) => {
    const categoryTypeVal: CategoryType = {
      name: values.name,
    };
    editCategoryType(categoryTypeVal);
  };

  return (
    <Form name="add_product_form" onFinish={onFinish} form={formRef}>
      <CategoryFields {...props} />
    </Form>
  );
}
