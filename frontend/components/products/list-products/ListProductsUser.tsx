import React, { useState } from "react";
import { Table, Pagination, Spin } from "antd";
import Navbar from "../../layout/Navbar";
import { useRouter } from "next/router";
import useGetAllEntity from "@/hooks/general-crud/useGetAllEntity";
import { PAGINATION_SIZE } from "@/constants/pagination";
import ProductCard from "../ProductCard";

function ListProductsUser() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const router = useRouter();

  const apiGetAllUrl = `api/product/get-all?page=${
    currentPage - 1
  }&size=${PAGINATION_SIZE}`;

  const { entities: products, errors, loading, total } = useGetAllEntity(apiGetAllUrl);

  // Handle pagination change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle table filter and sorting
  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  // Define columns for the table
  const columns = [
    {
      title: "Product",
      dataIndex: "productCard",
      key: "productCard",
      render: (text, product) => (
        <div
          key={product.id}
          onClick={() => router.push(`/products/get/${product.id}`)}
          style={{ cursor: "pointer" }}
        >
          {/* Render ProductCard inside the table */}
          <ProductCard product={product} />
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      sortOrder: sortedInfo.columnKey === "price" && sortedInfo.order,
    },
    {
      title: "Category Type",
      dataIndex: "categoryType",
      key: "categoryType",
      filters: [
        { text: "T-Shirt", value: "T-Shirt" },
        { text: "Pants", value: "Pants" },
        { text: "Dress", value: "Dress" },
      ],
      filteredValue: filteredInfo.categoryType || null,
      onFilter: (value, record) => record.categoryType.includes(value),
    },
  ];

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-3">
        {!loading && products && products.length > 0 && (
          <Table
            columns={columns}
            dataSource={products}
            rowKey="id"
            pagination={false}
            loading={loading}
            onChange={handleChange}
          />
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
