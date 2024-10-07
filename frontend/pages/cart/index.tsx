import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";

const CartPage = () => {
  const { cartItems, removeItem, updateItemQuantity, cartTotal } = useCart();
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Shopping Cart</h1>

      {cartItems.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Cart Items */}
          <div className="w-full lg:w-3/4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between border-b py-6"
              >
                {/* Product Image */}
                <div className="flex items-center">
                  <Image
                    src={item.image?.imageUrl}
                    alt={item.name}
                    width={120}
                    height={120}
                    className="rounded-md shadow-md"
                  />
                  <div className="ml-4">
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-600">Size: {item.size}</p>
                    <p className="text-gray-600">Color: {item.color}</p>
                  </div>
                </div>

                {/* Quantity and Price */}
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    className="w-12 text-center border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={item.quantity}
                    min="1"
                    onChange={(e) =>
                      updateItemQuantity(item.id, Number(e.target.value))
                    }
                  />

                  <p className="text-lg font-semibold">
                    ${item.price.toFixed(2)}
                  </p>

                  {/* Remove item */}
                  <button onClick={() => removeItem(item.id)}>
                    <CloseOutlined className="text-red-500 text-xl hover:text-red-700 transition duration-200" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="w-full lg:w-1/4 bg-gray-50 p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-4">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="mb-6">
              <Link
                href="/checkout"
                className="block w-full bg-blue-600 text-white py-2 text-center rounded-md hover:bg-blue-700 transition duration-200"
              >
                Proceed to Checkout
              </Link>
            </div>
            <Link
              href="/products/get-all"
              className="text-blue-600 hover:underline"
            >
              Continue Shopping
            </Link>
          </div>
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
};

export default CartPage;
