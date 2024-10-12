import React from "react";
import { Form, Input } from "antd";

function CreditCardFormFields() {
  return (
    <>
      <Form.Item
        label="Card Number"
        name={["creditCardInfo", "cardNumber"]}
        rules={[{ required: true, message: "Please enter your card number" }]}
      >
        <Input
          placeholder="1234 5678 9012 3456"
          maxLength={16}
        />
      </Form.Item>
      <div className="flex space-x-4">
        <Form.Item
          label="Expiration Date"
          name={["creditCardInfo", "expirationDate"]}
          rules={[{ required: true, message: "Please enter expiration date" }]}
          className="w-1/2"
        >
          <Input placeholder="MM/YY" maxLength={5} />
        </Form.Item>
        <Form.Item
          label="CVC"
          name={["creditCardInfo", "cvc"]}
          rules={[{ required: true, message: "Please enter your CVC" }]}
          className="w-1/2"
        >
          <Input placeholder="123" maxLength={3} />
        </Form.Item>
      </div>
      <Form.Item
        label="Cardholder Name"
        name={["creditCardInfo", "cardHolderName"]}
        rules={[{ required: true, message: "Please enter cardholder name" }]}
      >
        <Input placeholder="John Doe" />
      </Form.Item>
    </>
  );
}

export default CreditCardFormFields;
