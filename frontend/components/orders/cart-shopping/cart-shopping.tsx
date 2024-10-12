import React from "react";
import { useCart } from "@/context/cart-context";
import { Button } from "antd";
import CartSummary from "./cart-summary";
import CartShoppingDetails from "./cart-shopping-details";

function CartShopping() {
  const { cartItems, removeItem, updateItemQuantity, cartTotal } = useCart();

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Shopping Cart</h1>

      {cartItems.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Cart Items */}
          <CartShoppingDetails
            cartItems={cartItems}
            updateItemQuantity={updateItemQuantity}
            removeItem={removeItem}
          />
          {/* Cart Summary */}
          <CartSummary cartTotal={cartTotal} />
        </div>
      ) : (
        <div className="text-center mt-20">
          <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
          <Button
            href="/products/get-all"
            className="text-blue-600 hover:underline"
          >
            Continue Shopping
          </Button>
        </div>
      )}
    </div>
  );
}

export default CartShopping;
