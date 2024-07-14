import { useRouter } from "next/router";
import useGetOneEntity from "../general-crud/useGetOneEntity";
import useEditEntity from "../general-crud/useEditEntity";
import { useEffect } from "react";
import { EditSizeFacadeProps, Size } from "@/types/size";

export default function useEditFacade({
  id,
  formRef,
}: EditSizeFacadeProps) {
  const router = useRouter();
  const apiGetOneUrl = "/api/sizes/get";
  const apiEditUrl = "/api/sizes/edit";
  const { entity } = useGetOneEntity<Size>(apiGetOneUrl, Number(id));
  const {
    setEntityId,
    setUpdatedEntity,
    loading: loadingEdit,
    error: errorEdit,
    response: responseEdit,
  } = useEditEntity<Size>(apiEditUrl);

  useEffect(() => {
    if (entity) {
      formRef.setFieldsValue({
        size: entity.size,
      });
    }
  }, [entity, formRef, id]);

  const editSize = (updatedValues: Size) => {
    setEntityId(id);
    setUpdatedEntity(updatedValues);
  };

  useEffect(() => {
    if (!loadingEdit && !errorEdit && responseEdit) {
      router.push("/sizes/all");
    }
  }, [errorEdit, loadingEdit, responseEdit, router]);

  return {
    editSize,
  };
}
