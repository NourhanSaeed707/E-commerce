import useEditFacade from "@/hooks/sizes/useEditFacade";
import { AddSizeFieldsProps, EditSizeFacadeProps, Size } from "@/types/size";
import { Form } from "antd";
import { useRouter } from "next/router";
import React from "react";
import SizeFields from "./SizeFields";

export default function EditSize() {
  const [formRef] = Form.useForm();
  const router = useRouter();
  const { id } = router.query;

  const props: AddSizeFieldsProps = {
    edit: false,
  };

  const editFacadeProps: EditSizeFacadeProps = {
    id: Number(id),
    formRef,
  };

  const { editSize } = useEditFacade(editFacadeProps);

  const onFinish = (values: any) => {
    const sizeVal: Size = {
      size: values.size,
    };
    editSize(sizeVal);
  };

  return (
    <div>
      <Form name="edit_size_form" onFinish={onFinish} form={formRef}>
        <SizeFields {...props} />
      </Form>
    </div>
  );
}
