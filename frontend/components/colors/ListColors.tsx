import { BUTTONS } from "@/constants/category";
import useDeleteEntity from "@/hooks/general-crud/useDeleteEntity";
import useGetAllEntity from "@/hooks/general-crud/useGetAllEntity";
import { ColorTableProps } from "@/types/color";
import { Button } from "antd";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import ColorTable from "./ColorTable";

export default function ListColors() {
  const router = useRouter();
  const apiGetAllUrl = "/api/colors/get-all";
  const apiDeleteUrl = "/api/colors/delete";
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

  useEffect(() => {
    console.log("colooooooors entitiess: ", entities);
  }, [entities]);

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
