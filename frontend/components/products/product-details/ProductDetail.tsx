import React, { useEffect, useState } from "react";
import ProductDetailInfo from "./ProductDetailInfo";
import ProductImages from "./ProductImages";
import useGetOneEntity from "@/hooks/general-crud/useGetOneEntity";
import { ProductDetailInfoType } from "@/types/product";

function ProductDetail({ product }) {
  const [selectedColorId, SetSelectedColorId] = useState<number>(null);

  const apiImageUrl = "";
  const { entity } = useGetOneEntity(apiImageUrl, product.id);
  useEffect(() => {
    console.log("prooooooductt inside product detail from hook: ", product);
  }, [product]);

  const productDetailInfo: ProductDetailInfoType = {
    product,
    selectedColorId,
    SetSelectedColorId
  }

  return (
    <div>
      {product && (
        <>
          <ProductImages />
          <ProductDetailInfo {...productDetailInfo} />
        </>
      )}
    </div>
  );
}

export default ProductDetail;
