import React from "react";
import SizeTable from "./SizeTable";
import { BUTTONS } from "@/constants/category";
import { Button } from "antd";
import { useRouter } from "next/router";
import useGetAllEntity from "@/hooks/general-crud/useGetAllEntity";
import useDeleteEntity from "@/hooks/general-crud/useDeleteEntity";
import { SizeTableProps } from "@/types/size";

export default function ListSize() {
  const router = useRouter();
  const apiGetAllUrl = "/api/sizes/get-all";
  const apiDeleteUrl = "/api/sizes/delete";
  const { entities, errors, loading } = useGetAllEntity(apiGetAllUrl);

  const {
    setEntityId: setEntityIdDelete,
    entityId: deleteId,
    loading: loadingDelete,
    response: responseDelete,
    error: errorDelete,
  } = useDeleteEntity(apiDeleteUrl);

  const props: SizeTableProps = {
    entities,
    loading,
    errors,
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
