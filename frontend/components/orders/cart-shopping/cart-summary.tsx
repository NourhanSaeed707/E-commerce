import Link from "next/link";
import React from "react";

function CartSummary(props) {
  return (
    <div className="w-full lg:w-1/4 bg-gray-50 p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      <div className="flex justify-between mb-4">
        <span>Subtotal</span>
        <span>${props.cartTotal.toFixed(2)}</span>
      </div>
      <div className="mb-6">
        <Link
          href="/checkout"
          className="block w-full bg-blue-600 text-white py-2 text-center rounded-md hover:bg-blue-700 transition duration-200"
        >
          Proceed to Checkout
        </Link>
      </div>
      <Link href="/products/get-all" className="text-blue-600 hover:underline">
        Continue Shopping
      </Link>
    </div>
  );
}

export default CartSummary;
