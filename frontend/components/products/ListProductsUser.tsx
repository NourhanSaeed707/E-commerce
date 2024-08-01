import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import useGetAllEntity from "@/hooks/general-crud/useGetAllEntity";
import { Spin } from "antd";

function ListProductsUser() {
  const apiGetAllUrl = "api/product/get-all";
  const { entities: products, errors, loading } = useGetAllEntity(apiGetAllUrl);

  useEffect(() => {
    console.log("proooooooooducts: ", products);
  }, [products]);

  return (
    <div>
      {!loading &&
        products &&
        products.length &&
        products.map((product, index) => (
          <div key={index}>
            <ProductCard product={product} />
          </div>
        ))}
      {loading && <Spin />}
    </div>
  );
}

export default ListProductsUser;
