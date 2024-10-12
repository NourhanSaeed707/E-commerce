import { useEffect, useState } from "react";
import { useCart } from "@/context/cart-context";
import { Form, Button, Radio, Input } from "antd";
import { useRouter } from "next/router";
import CartSummaryCheckout from "./cart-summary-checkout";
import ShippingFormFields from "./shipping-form-fields";
import CreditCardFormFields from "./credit-card-form-fields";

export const Checkout = () => {
  const { cartItems, removeItem, updateItemQuantity, cartTotal } = useCart();
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [creditCardInfo, setCreditCardInfo] = useState({
    cardNumber: "",
    expirationDate: "",
    cvc: "",
    cardHolderName: "",
  });
  const router = useRouter();

  const handleShippingChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleCreditCardChange = (e) => {
    setCreditCardInfo({
      ...creditCardInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    // Send shippingInfo, cartItems, paymentMethod, and creditCardInfo (if applicable) to the backend.
    console.log("Shipping Info:", shippingInfo);
    console.log("Payment Method:", paymentMethod);
    console.log("Cart Items:", cartItems);
    if (paymentMethod === "creditCard") {
      console.log("Credit Card Info:", creditCardInfo);
    }

    // Navigate to a confirmation page after successful order placement.
    router.push("/order-confirmation");
  };

  useEffect(() => {
    console.log("caaaaart items: ", cartItems);
  }, [cartItems]);

  return (
    <div className="checkout-container mx-auto max-w-4xl p-4">
      <h1 className="text-2xl font-semibold mb-4">Checkout</h1>

      {/* Cart Summary */}
      <CartSummaryCheckout cartItems={cartItems} cartTotal={cartTotal} />

      {/* Shipping Form */}
      <Form layout="vertical" className="shipping-form mb-8">
        <h2 className="text-xl mb-4">Shipping Information</h2>
        <ShippingFormFields />
      </Form>

      {/* Payment Methods */}
      <div className="payment-method mb-8">
        <h2 className="text-xl mb-4">Payment Method</h2>
        <Radio.Group onChange={handlePaymentChange} value={paymentMethod}>
          <Radio value="creditCard">Credit Card</Radio>
          <Radio value="cache">Cache</Radio>
        </Radio.Group>
      </div>

      {/* Conditionally Render Credit Card Form */}
      {paymentMethod === "creditCard" && (
        <Form layout="vertical" className="credit-card-form mb-8">
          <h2 className="text-xl mb-4">Credit Card Information</h2>
          <CreditCardFormFields />
        </Form>
      )}

      {/* Place Order Button */}
      <Button type="primary" onClick={handleSubmit}>
        Place Order
      </Button>
    </div>
  );
};

export default Checkout;
