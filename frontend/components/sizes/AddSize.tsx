import useAddEntity from "@/hooks/general-crud/useAddEntity";
import { AddSizeFieldsProps, Size } from "@/types/size";
import { Form } from "antd";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import SizeFields from "./SizeFields";

export default function AddSize() {
  const apiUrl = "/api/sizes/save";
  const [formRef] = Form.useForm();
  const router = useRouter();

  const props: AddSizeFieldsProps = {
    edit: false,
  };
  const { setEntity, loading, error, response } = useAddEntity(apiUrl);

  const onFinish = (values: any) => {
    const size: Size = {
      size: values.size,
    };
    setEntity(size);
  };

  useEffect(() => {
    if (!loading && !error && response) {
      router.push("/sizes/all");
    }
  }, [error, loading, response, router]);

  return (
    <div>
      <Form name="add_size_form" onFinish={onFinish} form={formRef}>
        <SizeFields {...props} />
      </Form>
    </div>
  );
}
