import React, { useEffect, useReducer, useState } from "react";
import ProductCard from "../ProductCard";
import useGetAllEntity from "@/hooks/general-crud/useGetAllEntity";
import { Pagination, Spin } from "antd";
import Navbar from "../../layout/Navbar";
import { useRouter } from "next/router";
import { PAGINATION_SIZE } from "@/constants/pagination";

function ListProductsUser() {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const apiGetAllUrl = `api/product/get-all?page=${
    currentPage - 1
  }&size=${PAGINATION_SIZE}`;
  const { entities: products, errors, loading, total } = useGetAllEntity(apiGetAllUrl);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-3">
        {!loading && products && products.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            {products.map((product, index) => (
              <div
                key={index}
                onClick={() => router.push(`/products/get/${product.id}`)}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
        {loading && <Spin />}
        {!loading && products && products.length > 0 && (
          <div className="flex justify-center mt-4">
            <Pagination
              current={currentPage}
              pageSize={PAGINATION_SIZE}
              total={total}
              onChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default ListProductsUser;
