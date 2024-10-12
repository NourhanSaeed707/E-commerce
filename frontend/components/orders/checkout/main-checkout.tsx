import { useEffect, useState } from "react";
import { useCart } from "@/context/cart-context";
import { Form, Button, Radio } from "antd";
import CartSummaryCheckout from "./cart-summary-checkout";
import ShippingFormFields from "./shipping-form-fields";
import CreditCardFormFields from "./credit-card-form-fields";
import useAddEntity from "@/hooks/general-crud/useAddEntity";
import { useAuth } from "@/context/auth-context";
import { ICreckoutType, IOrder, OrderStatus } from "@/types/orders";
import { ProductForm } from "@/types/product";

export const Checkout = () => {
  const apiUrl = "/api/checkout/process";
  const { cartItems, cartTotal } = useCart();
  const [form] = Form.useForm();
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const { setEntity, loading, error, response } = useAddEntity(apiUrl);
  const { currentUser } = useAuth();

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      console.log("cureeeeent user: ", currentUser);
      const values = await form.validateFields();
      const { shippingInfo, creditCardInfo } = values;
      const orders: IOrder[] = [];
      cartItems.map((item) => {
        orders.push({
          user: currentUser,
          product: {
            id: item.id,
          } as ProductForm,
          orderDate: new Date(),
          quantity: item.quantity,
          totalPrice: cartTotal,
          status: OrderStatus.PENDING,
        });
      });
      console.log("ordeeeeeeeeeeers: ", orders);
      console.log("Shipping Info:", shippingInfo);
      console.log("creeedit Info:", creditCardInfo);
      console.log("Payment Method:", paymentMethod);
      console.log("Cart Items:", cartItems);
      console.log("caaaaaaart total: ", cartTotal);

      const modifiedShippingInfo = {
        ...shippingInfo,
        country: shippingInfo.country.label, // Assuming shippingInfo.country is the object you mentioned
      };

      const checkout: ICreckoutType = {
        orders: orders,
        shippingInfo: modifiedShippingInfo,
        creditCardInfo: creditCardInfo,
      };
      console.log("checcccccckout: ", checkout);
      setEntity(checkout);
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