import useAddEntity from "@/hooks/general-crud/useAddEntity";
import { AddColorFieldsProps, Color } from "@/types/color";
import { Form } from "antd";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import ColorFields from "./ColorFields";

export default function AddColor() {
  const apiUrl = "/api/product/save";
  const [formRef] = Form.useForm();
  const router = useRouter();

  const props: AddColorFieldsProps = {
    edit: false
  }
  const { setEntity, loading, error, response } = useAddEntity(apiUrl);

  const onFinish = (values: any) => {
    const color: Color = {
        color: values.color,
    };
    setEntity(color);
  };

  useEffect(() => {
    if (!loading && !error && response) {
      router.push("/colors/all");
    }
  }, [error, loading, response, router]);

  return (
    <div>
    <Form name="add_product_form" onFinish={onFinish} form={formRef}>
      <ColorFields {...props} />
    </Form>
  </div>
  );
}
