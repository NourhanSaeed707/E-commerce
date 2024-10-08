import React, { useState } from "react";
import { Pagination, Spin } from "antd";
import { useRouter } from "next/router";
import { PAGINATION_SIZE } from "@/constants/pagination";
import ProductCard from "../product-card";
import FiltrationSideMenu from "./filtration-side-menu";
import { FiltrationSideMenuProps } from "@/types/product";
import useGetAllProducts from "@/hooks/products/useGetAllProducts";

function ListProductsUser() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<"lowToHigh" | "highToLow" | null>(
    null
  );
  const [colorFilter, setColorFilter] = useState<number | null>(null);
  const [categoryTypeFilter, setCategoryTypeFilter] = useState<number | null>(
    null
  );
  const [sizeFilter, setSizeFilter] = useState<number | null>(null);
  const router = useRouter();
  const { genderFilter } = router.query;

  const apiGetAllUrl = `api/product/get-all?page=${
    currentPage - 1
  }&size=${PAGINATION_SIZE}&categoryTypeFilter=${Number(
    categoryTypeFilter
  )}&colorFilter=${Number(colorFilter)}&sizeFilter=${Number(
    sizeFilter
  )}&genderFilter=${genderFilter}`;

  const {
    entities: products = [],
    errors,
    loading,
    total,
  } = useGetAllProducts(apiGetAllUrl);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const sortedProducts = () => {
    if (products) {
      if (sortOrder === "lowToHigh") {
        return [...products].sort((a, b) => a.price - b.price);
      } else if (sortOrder === "highToLow") {
        return [...products].sort((a, b) => b.price - a.price);
      }
    }
    return products;
  };

  const filterSideMenuObj: FiltrationSideMenuProps = {
    setSortOrder,
    setColorFilter,
    setSizeFilter,
    setCategoryTypeFilter,
    sortOrder,
    colorFilter,
    sizeFilter,
    categoryTypeFilter,
  };

  return (
    <>
      <div className="container mx-auto mt-3 flex">
        <FiltrationSideMenu {...filterSideMenuObj} />
        <div className="w-3/4 p-4">
          {loading && <Spin />}
          {!loading && sortedProducts() && sortedProducts().length > 0 && (
            <>
              <div className="grid grid-cols-3 gap-4">
                {sortedProducts() &&
                  sortedProducts()?.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => router.push(`/products/get/${product.id}`)}
                      className="cursor-pointer"
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
              </div>
              <div className="flex justify-center mt-4">
                <Pagination
                  current={currentPage}
                  pageSize={PAGINATION_SIZE}
                  total={total}
                  onChange={handlePageChange}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ListProductsUser;
