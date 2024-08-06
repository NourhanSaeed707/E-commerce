import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import useGetAllEntity from "@/hooks/general-crud/useGetAllEntity";
import { Spin } from "antd";
import Navbar from "../layout/Navbar";

function ListProductsUser() {
  const apiGetAllUrl = "api/product/get-all";
  const { entities: products, errors, loading } = useGetAllEntity(apiGetAllUrl);

  useEffect(() => {
    console.log("proooooooooducts: ", products);
  }, [products]);

  return (
    <>
    <Navbar />
    <div className="container mx-auto mt-3">
      {!loading && products && products.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      )}
      {loading && <Spin />}
    </div>
    </>
  );
}

export default ListProductsUser;
