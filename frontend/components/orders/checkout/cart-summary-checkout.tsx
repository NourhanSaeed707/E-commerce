import Image from 'next/image';
import React from 'react'

function CartSummaryCheckout(props) {
  return (
    <div className="cart-summary bg-white shadow-md rounded-lg p-6 mb-8">
    <h2 className="text-2xl font-bold mb-4 border-b pb-2">Your Cart</h2>
    {props.cartItems.length > 0 ? (
      <ul className="space-y-4">
        {props.cartItems.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between p-4 border rounded-md bg-gray-50"
          >
            <div className="flex items-center">
              {/* Image or placeholder */}
              <Image
                src={item.image.imageUrl || "/placeholder.jpg"}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md mr-4"
                width={120}
                height={120}
              />
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  {item.quantity} x ${item.price}
                </p>
              </div>
            </div>
            <div className="text-lg font-semibold text-gray-700">
              ${item.quantity * item.price}
            </div>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-center text-gray-500">Your cart is empty.</p>
    )}

    <div className="font-bold text-lg mt-6 border-t pt-4 text-right">
      Total: <span className="text-2xl">${props.cartTotal}</span>
    </div>
  </div>
  )
}

export default CartSummaryCheckout;