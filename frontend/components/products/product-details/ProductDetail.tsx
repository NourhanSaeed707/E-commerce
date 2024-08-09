import React, { useEffect } from "react";
import ProductDetailInfo from "./ProductDetailInfo";
import ProductImages from "./ProductImages";
import { useRouter } from "next/router";
import useGetOneEntity from "@/hooks/general-crud/useGetOneEntity";

function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const apiUrl = `/api/product/get`;
  const { entity: product, loading } = useGetOneEntity(apiUrl, Number(id));

  useEffect(() => {
    console.log("prooooooductt: ", product);
  }, [product]);

  return (
    <div>
      {
        !loading && product && (

          <><ProductImages /><ProductDetailInfo product={product} /></>
        )
      }
    </div>
  );
}

export default ProductDetail;
