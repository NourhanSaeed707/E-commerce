import React from "react";
import { Button } from "antd";
import { useRouter } from "next/router";
import { useCart } from "@/context/cart-context";

function OrderSuccess() {
  const router = useRouter();
  const { clearCart } = useCart();

  const handleContinueShopping = () => {
    router.push("/"); 
    clearCart();
  };

  return (
    <div className="success-container mx-auto max-w-4xl p-4 text-center">
      <h1 className="text-3xl font-semibold mb-4">Order Successful!</h1>
      <p className="text-lg mb-8">
        Thank you for your purchase! Your order has been successfully placed.
      </p>
      <Button type="primary" onClick={handleContinueShopping}>
        Continue Shopping
      </Button>
    </div>
  );
}

export default OrderSuccess;
