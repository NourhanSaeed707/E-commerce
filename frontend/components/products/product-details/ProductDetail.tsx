import React, { useState } from "react";
import ProductDetailInfo from "./ProductDetailInfo";
import ProductImages from "./ProductImages";
import { ProductDetailInfoType } from "@/types/product";
import useGetAllImages from "@/hooks/images/useGetAllImages";
import { useParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";

function ProductDetail({ product }) {
  const [selectedColorId, SetSelectedColorId] = useState<number>(
    product?.color[0]?.id
  );
  const { id } = useParams();
  const apiImageUrl = "/api/product-color/get/images";
  const { images, error } = useGetAllImages(
    apiImageUrl,
    Number(id),
    selectedColorId
  );

  const productDetailInfo: ProductDetailInfoType = {
    product,
    selectedColorId,
    SetSelectedColorId,
  };

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        {product && (
          <div className="flex justify-between gap-10">
            <div className="flex-1" style={{ margin: 0 }}>
              <ProductImages images={images} />
            </div>
            <div className="flex-1 " style={{ margin: 0 }}>
              <ProductDetailInfo {...productDetailInfo} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductDetail;
