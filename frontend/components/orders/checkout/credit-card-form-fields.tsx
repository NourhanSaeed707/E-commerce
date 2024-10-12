import React from "react";
import { Form, Button, Radio, Input } from "antd";

function CreditCardFormFields() {
  return (
    <>
      <Form.Item label="Card Number">
        <Input
          name="cardNumber"
          placeholder="1234 5678 9012 3456"
          maxLength={16}
        />
      </Form.Item>
      <div className="flex space-x-4">
        <Form.Item label="Expiration Date" className="w-1/2">
          <Input name="expirationDate" placeholder="MM/YY" maxLength={5} />
        </Form.Item>
        <Form.Item label="CVC" className="w-1/2">
          <Input name="cvc" placeholder="123" maxLength={3} />
        </Form.Item>
      </div>
      <Form.Item label="Cardholder Name">
        <Input name="cardHolderName" placeholder="John Doe" />
      </Form.Item>
    </>
  );
}

export default CreditCardFormFields;
