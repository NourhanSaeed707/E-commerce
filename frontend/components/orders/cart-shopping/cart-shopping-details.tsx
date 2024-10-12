import Image from "next/image";
import React from "react";
import { CloseOutlined } from "@ant-design/icons";

function CartShoppingDetails(props) {
  return (
    <div className="w-full lg:w-3/4">
    {props.cartItems.map((item) => (
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
                props.updateItemQuantity(item.id, Number(e.target.value))
            }
          />

          <p className="text-lg font-semibold">
            ${item.price.toFixed(2)}
          </p>

          {/* Remove item */}
          <button onClick={() => props.removeItem(item.id)}>
            <CloseOutlined className="text-red-500 text-xl hover:text-red-700 transition duration-200" />
          </button>
        </div>
      </div>
    ))}
  </div>
  );
}

export default CartShoppingDetails;
