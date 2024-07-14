import { BUTTONS } from "@/constants/category";
import useDeleteEntity from "@/hooks/general-crud/useDeleteEntity";
import useGetAllEntity from "@/hooks/general-crud/useGetAllEntity";
import { ColorTableProps } from "@/types/color";
import { Button } from "antd";
import { useRouter } from "next/router";
import React from "react";
import ColorTable from "./ColorTable";

export default function ListColors() {
  const router = useRouter();
  const apiGetAllUrl = "/api/product/get-all";
  const apiDeleteUrl = "/api/product/delete";
  const { entities, errors, loading } = useGetAllEntity(apiGetAllUrl);
  const {
    setEntityId: setEntityIdDelete,
    entityId: deleteId,
    loading: loadingDelete,
    response: responseDelete,
    error: errorDelete,
  } = useDeleteEntity(apiDeleteUrl);

  const props: ColorTableProps = {
    entities,
    loading,
    errors,
    setEntityIdDelete,
  };
  return (
    <div>
      <div>
        <Button
          type="primary"
          onClick={() => router.push("/products/add")}
          className="mb-2 mt-2"
        >
          {BUTTONS.ADD}
        </Button>
        <ColorTable {...props} />
      </div>
    </div>
  );
}
