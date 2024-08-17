import React, { useEffect } from "react";
import ProductDetailInfo from "./ProductDetailInfo";
import ProductImages from "./ProductImages";

function ProductDetail({ product }) {
  useEffect(() => {
    console.log("prooooooductt inside product detail from hook: ", product);
  }, [product]);

  return (
    <div>
      {product && (
        <>
          <ProductImages />
          <ProductDetailInfo product={product} />
        </>
      )}
    </div>
  );
}

export default ProductDetail;
