import { BUTTONS } from "@/constants/category";
import useDeleteEntity from "@/hooks/general-crud/useDeleteEntity";
import useGetAllEntity from "@/hooks/general-crud/useGetAllEntity";
import { ColorTableProps } from "@/types/color";
import { Button } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
import ColorTable from "./color-table";
import { PAGINATION_SIZE } from "@/constants/pagination";

export default function ListColors() {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const apiGetAllUrl = `/api/colors/get-all?page=${currentPage - 1}&size=${PAGINATION_SIZE}`;
  const apiDeleteUrl = "/api/colors/delete";
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

  const props: ColorTableProps = {
    entities,
    loading,
    errors,
    currentPage,
    total,
    setEntityIdDelete,
    handlePageChange,
  };

  return (
    <div>
      <div>
        <Button
          type="primary"
          onClick={() => router.push("/colors/add")}
          className="mb-2 mt-2"
        >
          {BUTTONS.ADD}
        </Button>
        <Button
          type="text"
          onClick={() => router.push("/")}
          className="mb-2 mt-2"
          style={{ backgroundColor: '#D1D100' }}
        >
          {BUTTONS.BACK}
        </Button>
        <ColorTable {...props} />
      </div>
    </div>
  );
}
