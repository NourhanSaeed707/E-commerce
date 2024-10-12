import { useEffect, useState } from "react";
import { useCart } from "@/context/cart-context";
import { Form, Button, Radio } from "antd";
import CartSummaryCheckout from "./cart-summary-checkout";
import ShippingFormFields from "./shipping-form-fields";
import CreditCardFormFields from "./credit-card-form-fields";
import useAddEntity from "@/hooks/general-crud/useAddEntity";

export const Checkout = () => {
  const apiUrl = "/api/orders/save";
  const { cartItems, cartTotal } = useCart();
  const [form] = Form.useForm();
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const { setEntity, loading, error, response } = useAddEntity(apiUrl);

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      // Validate fields
      const values = await form.validateFields();
      const { shippingInfo, creditCardInfo } = values;

      console.log("Shipping Info:", shippingInfo);
      console.log("Payment Method:", paymentMethod);
      console.log("Cart Items:", cartItems);
      if (paymentMethod === "creditCard") {
        console.log("Credit Card Info:", creditCardInfo);
      }
    } catch (error) {
      console.error("Validation Failed:", error);
    }
  };

  useEffect(() => {
    console.log("caaaaart items: ", cartItems);
  }, [cartItems]);

  return (
    <div className="checkout-container mx-auto max-w-4xl p-4">
      <h1 className="text-2xl font-semibold mb-4">Checkout</h1>
      {/* Cart Summary */}
      <CartSummaryCheckout cartItems={cartItems} cartTotal={cartTotal} />
      {/* Main Form */}
      <Form form={form} layout="vertical" className="checkout-form mb-8">
        <h2 className="text-xl mb-4">Shipping Information</h2>
        <ShippingFormFields />
        {/* Payment Methods */}
        <div className="payment-method mb-8">
          <h2 className="text-xl mb-4">Payment Method</h2>
          <Radio.Group onChange={handlePaymentChange} value={paymentMethod}>
            <Radio value="creditCard">Credit Card</Radio>
            <Radio value="Cash">Cash</Radio>
          </Radio.Group>
        </div>

        {/* Conditionally Render Credit Card Form */}
        {paymentMethod === "creditCard" && (
          <>
            <h2 className="text-xl mb-4">Credit Card Information</h2>
            <CreditCardFormFields />
          </>
        )}
      </Form>

      {/* Place Order Button */}
      <Button type="primary" onClick={handleSubmit}>
        Place Order
      </Button>
    </div>
  );
};

export default Checkout;
