import ProductDetail from "@/components/products/product-details/ProductDetail";
import { GetOneServerSide } from "@/utils/getOneServerSide";
import { GetServerSideProps } from "next";
import React, { useEffect } from "react";

function  GetOnePage({product}) {

  return (
    <div>
      <ProductDetail product={product} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const Id = context.query.id;
  const apiUrl = `/api/product/get`;
  const { props } = await GetOneServerSide({ context, Id: Number(Id), apiUrl });
  console.log("proooooooooops: ", props);
  return {
    props,
  };
}

export default GetOnePage;
