import React, { useEffect, useRef } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Image } from "antd";

function RecommendationsCarousel({ products = [] }) {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  useEffect(() => {
    console.log("Product recommendations: ", products);
  }, [products]);

  return (
    <div className="relative flex items-center overflow-hidden"> {/* Add overflow-hidden here */}
      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-100 p-2 rounded-full shadow-md"
      >
        <LeftOutlined />
      </button>

      {/* Recommendations List */}
      <div
        ref={carouselRef}
        className="flex space-x-4 mx-12 overflow-x-auto scrollbar-hide" // Add overflow-x-auto and scrollbar-hide
        style={{ scrollBehavior: "smooth" }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="flex-none w-48 bg-white rounded-lg shadow-md p-4"
          >
            <Image
              src={product?.images?.[0]?.imageUrl}
              alt={product.name}
              className="h-32 w-full object-cover rounded"
            />
            <h3 className="text-md font-semibold mt-2">{product.name}</h3>
            <p className="text-sm text-gray-500">${product.price}</p>
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-100 p-2 rounded-full shadow-md"
      >
        <RightOutlined />
      </button>
    </div>
  );
}

export default RecommendationsCarousel;
