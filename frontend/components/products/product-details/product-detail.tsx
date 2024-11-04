import React, { useEffect, useState } from "react";
import ProductDetailInfo from "./product-detail-info";
import ProductImages from "./product-images";
import { ProductDetailInfoType } from "@/types/product";
import useGetAllImages from "@/hooks/images/useGetAllImages";
import { useParams } from "next/navigation";
import useGetAllEntity from "@/hooks/general-crud/useGetAllEntity";
import { useAuth } from "@/context/auth-context";
import useAddEntity from "@/hooks/general-crud/useAddEntity";
import { InteractionType } from "@/types/users";
import RecommendationsCarousel from "@/components/recommendations/recommendations-products";

function ProductDetail({ product }) {
  const { currentUser } = useAuth();
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

  const apiGetAllUrl = `/api/recommendations/${currentUser?.id}`;
  const { entities: recommendations, errors, loading, total } = useGetAllEntity(apiGetAllUrl);

  const apiUserInteraction = "/api/interactions/";
  const { setEntity } = useAddEntity(apiUserInteraction);

  useEffect(() => {
    setEntity({
      user: currentUser,
      product: product,
      interactionType: InteractionType.LIKED,
      interactionDate: new Date(),
    });
  }, [currentUser, product, setEntity]);


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
      <div>
        {/* Recommendations Carousel */}
        {Array.isArray(recommendations) && recommendations.length > 0 && ( // Check if recommendations is array
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
            <RecommendationsCarousel products={recommendations} />
          </div>
        )}
      </div>
    </>
  );
}

export default ProductDetail;
