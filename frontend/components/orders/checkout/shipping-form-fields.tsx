import React from "react";
import { Form, Input } from "antd";

function ShippingFormFields() {
  return (
    <>
      <Form.Item label="Full Name">
        <Input name="fullName" />
      </Form.Item>
      <Form.Item label="Address">
        <Input name="address" />
      </Form.Item>
      <Form.Item label="City">
        <Input name="city" />
      </Form.Item>
      <Form.Item label="Postal Code">
        <Input name="postalCode" />
      </Form.Item>
      <Form.Item label="Country">
        <Input name="country" />
      </Form.Item>
    </>
  );
}

export default ShippingFormFields;
