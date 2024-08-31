import React, { useState } from "react";
import SizeTable from "./SizeTable";
import { BUTTONS } from "@/constants/category";
import { Button } from "antd";
import { useRouter } from "next/router";
import useGetAllEntity from "@/hooks/general-crud/useGetAllEntity";
import useDeleteEntity from "@/hooks/general-crud/useDeleteEntity";
import { SizeTableProps } from "@/types/size";
import { PAGINATION_SIZE } from "@/constants/pagination";

export default function ListSize() {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const apiGetAllUrl = `/api/sizes/get-all?page=${
    currentPage - 1
  }&size=${PAGINATION_SIZE}`;
  const apiDeleteUrl = "/api/sizes/delete";
  const { entities, errors, loading, total } = useGetAllEntity(apiGetAllUrl);

  const {
    setEntityId: setEntityIdDelete,
    entityId: deleteId,
    loading: loadingDelete,
    response: responseDelete,
    error: errorDelete,
  } = useDeleteEntity(apiDeleteUrl);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const props: SizeTableProps = {
    entities,
    loading,
    errors,
    total,
    currentPage,
    handlePageChange,
    setEntityIdDelete,
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => router.push("/sizes/add")}
        className="mb-2 mt-2"
      >
        {BUTTONS.ADD}
      </Button>
      <Button
        type="text"
        onClick={() => router.push("/")}
        className="mb-2 mt-2"
        style={{ backgroundColor: "#D1D100" }}
      >
        {BUTTONS.BACK}
      </Button>
      <SizeTable {...props} />
    </div>
  );
}
