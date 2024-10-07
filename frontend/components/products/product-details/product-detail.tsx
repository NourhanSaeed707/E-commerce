import React, { useState } from "react";
import ProductDetailInfo from "./product-detail-info";
import ProductImages from "./product-images";
import { ProductDetailInfoType } from "@/types/product";
import useGetAllImages from "@/hooks/images/useGetAllImages";
import { useParams } from "next/navigation";

function ProductDetail({ product }) {
  const [selectedColorId, SetSelectedColorId] = useState<number>(
    product?.color[0]?.id
  );
  const [selectSizeId, setSelectedSizeId] = useState<number>();
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
    selectSizeId,
    SetSelectedColorId,
    setSelectedSizeId,
    images,
  };

  return (
    <>
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
