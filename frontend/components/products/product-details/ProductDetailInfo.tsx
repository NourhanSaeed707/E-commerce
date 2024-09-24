import { Button } from "antd";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function ProductDetailInfo({ product, SetSelectedColorId, selectedColorId }) {
  return (
    <div>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 ">
          {/* Product Details */}
          <div className="flex flex-col space-y-4">
            <h1 className="text-3xl font-bold">Product Name</h1>
            <p className="text-xl font-semibold text-gray-700">$100.00</p>
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
                    <button
                      key={sizeVal.id}
                      className="px-4 py-2 border rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-blue-500"
                    >
                      {sizeVal.size}
                    </button>
                  ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium mb-2">Select Color</h2>
              <div className="flex space-x-2">
                {product &&
                  product.color &&
                  product.color.length &&
                  product.color.map((colorVal) => (
                    <Button
                      key={colorVal.id}
                      className={`w-10 h-10 p-0 rounded-full border focus:ring-2 ${
                        selectedColorId === colorVal.id ? "ring-blue-500" : ""
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
            <button className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailInfo;
