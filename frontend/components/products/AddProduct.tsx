import React from "react";
import  ProductFields  from "./ProductFields";
import { Form } from "antd";

export default function AddProduct() {
  const [ formRef ] = Form.useForm();
  const onFinish = (values: any) => {
    console.log("vaaaaaalues: ", values)
  };

  const handleChangeSelectGender = (values: any) => {

  }

  return (
    <div>
       <Form
        name="add_product_form"
        onFinish={onFinish}
        form={formRef}
      >
        <ProductFields  handleChangeSelectGender={handleChangeSelectGender} />
      </Form>
    </div>
  );
}
