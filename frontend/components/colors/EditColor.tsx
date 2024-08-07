import useEditFacade from "@/hooks/colors/useEditFacade";
import {
  AddColorFieldsProps,
  Color,
  EditColorFacadeProps,
} from "@/types/color";
import { Form } from "antd";
import { useRouter } from "next/router";
import React from "react";
import ColorFields from "./ColorFields";

export default function EditColor() {
  const [formRef] = Form.useForm();
  const router = useRouter();
  const { id } = router.query;
  const props: AddColorFieldsProps = {
    edit: false,
  };

  const editFacadeProps: EditColorFacadeProps = {
    id: Number(id),
    formRef,
  };
  const { editColor } = useEditFacade(editFacadeProps);

  const onFinish = (values: any) => {
    const colorVal: Color = {
      color: values.color,
    };
    editColor(colorVal);
  };
  
  return (
    <div>
      <Form name="edit_color_form" onFinish={onFinish} form={formRef}>
        <ColorFields {...props} />
      </Form>
    </div>
  );
}
