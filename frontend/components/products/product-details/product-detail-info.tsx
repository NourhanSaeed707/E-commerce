import { useAuth } from "@/context/auth-context";
import { useCart } from "@/context/cart-context";
import useAddEntity from "@/hooks/general-crud/useAddEntity";
import { NotifyType } from "@/types/notification";
import { Button } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function ProductDetailInfo({
  product,
  SetSelectedColorId,
  setSelectedSizeId,
  selectedColorId,
  selectSizeId,
  images,
}) {
  const apiUrl = "/api/observers/save";
  const { addToCart, cartItems, setUserId } = useCart();
  const { currentUser } = useAuth();
  const { setEntity, loading, response, error } = useAddEntity(apiUrl);

  useEffect(() => {
    currentUser && currentUser.id ? setUserId(currentUser.id) : setUserId(null);
  }, [currentUser, setUserId]);

  const handleNotifyMe = () => {
    const noftifyObj: NotifyType = {
      user: currentUser,
      product: product,
    };
    setEntity(noftifyObj);
  };

  return (
    <div>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 ">
          {/* Product Details */}
          <div className="flex flex-col space-y-4">
            <h1 className="text-3xl font-bold">{product && product.name}</h1>
            <p className="text-xl font-semibold text-gray-700">
              {product && product.price}
            </p>
            <p
              className={`text-sm font-medium ${
                product && product.stock ? "text-green-600" : "text-red-600"
              }`}
            >
              {product && product.stock ? "In Stock" : "Out of Stock"}
            </p>

            {/* Sizes */}
            <div>
              <h2 className="text-lg font-medium mb-2">Select Size</h2>
              <div className="flex space-x-2">
                {product &&
                  product.size &&
                  product.size.map((sizeVal) => (
                    <Button
                      key={sizeVal.id}
                      className={`px-4 py-2 border rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-blue-500
                      ${
                        selectSizeId === sizeVal.id
                          ? "ring-2 ring-blue-500" // Apply ring when selected
                          : ""
                      }`}
                      onClick={() => setSelectedSizeId(sizeVal.id)}
                    >
                      {sizeVal.size}
                    </Button>
                  ))}
              </div>
            </div>

            {/* Colors */}
            <div>
              <h2 className="text-lg font-medium mb-2">Select Color</h2>
              <div className="flex space-x-2">
                {product &&
                  product.color &&
                  product.color.map((colorVal) => (
                    <Button
                      key={colorVal.id}
                      className={`w-10 h-10 p-0 rounded-full border focus:ring-2
                      ${
                        selectedColorId === colorVal.id
                          ? "ring-2 ring-blue-500"
                          : ""
                      } overflow-hidden`}
                      onClick={() => SetSelectedColorId(colorVal.id)}
                    >
                      <div className="w-full h-full">
                        <Image
                          src={colorVal.imageUrl}
                          alt={colorVal.colorName}
                          width={55}
                          height={55}
                          className="rounded-full object-cover w-full h-full"
                        />
                      </div>
                    </Button>
                  ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            {product && product.stock ? (
              <Button
                onClick={() => {
                  addToCart(
                    product.id,
                    product.name,
                    selectSizeId,
                    selectedColorId,
                    images[0],
                    product.price
                  );
                }}
                className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
              >
                Add to Cart
              </Button>
            ) : (
              <Button
                onClick={handleNotifyMe}
                className="mt-4 px-6 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600"
              >
                Notify Me When Available
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailInfo;
