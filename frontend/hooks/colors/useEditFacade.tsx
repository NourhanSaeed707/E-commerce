import { Color, EditColorFacadeProps } from "@/types/color";
import { useRouter } from "next/router";
import useGetOneEntity from "../general-crud/useGetOneEntity";
import useEditEntity from "../general-crud/useEditEntity";
import { useEffect } from "react";

export default function useEditFacade({ id, formRef , setImageUrl}: EditColorFacadeProps) {
  const router = useRouter();
  const apiGetOneUrl = "/api/colors/get";
  const apiEditUrl = "/api/colors/edit";
  const { entity } = useGetOneEntity<Color>(apiGetOneUrl, Number(id));
  const {
    setEntityId,
    setUpdatedEntity,
    loading: loadingEdit,
    error: errorEdit,
    response: responseEdit,
  } = useEditEntity<Color>(apiEditUrl);

  useEffect(() => {
    if (entity) {
      formRef.setFieldsValue({
        color: entity.color,
        imageUrl: entity.imageUrl,
      });
      setImageUrl(entity.imageUrl ? [entity.imageUrl] : []);
    }
  }, [entity, formRef, id]);

  const editColor = (updatedValues: Color) => {
    setEntityId(id);
    setUpdatedEntity(updatedValues);
  };

  useEffect(() => {
    if (!loadingEdit && !errorEdit && responseEdit) {
      router.push("/colors/all");
    }
  }, [errorEdit, loadingEdit, responseEdit, router]);

  return {
    editColor,
  };
}
