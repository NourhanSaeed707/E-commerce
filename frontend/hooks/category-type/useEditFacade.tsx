import { useRouter } from "next/router";
import { useEffect } from "react";
import { CategoryType, editFacadeProps } from "@/types/category";
import "react-toastify/dist/ReactToastify.css";
import useGetOneEntity from "../general-crud/useGetOneEntity";
import useEditEntity from "../general-crud/useEditEntity";

export default function useEditFacade({ id, formRef }: editFacadeProps) {
  const router = useRouter();
  const apiGetOneUrl =  "/api/category-type/get";
  const apiEditUrl =  "/api/category-type/edit";
  const {entity} = useGetOneEntity(apiGetOneUrl, Number(id));
  const {setEntityId, setUpdatedEntity, loading: loadingEdit, error: errorEdit, response: responseEdit} = useEditEntity(apiEditUrl)

  useEffect(() => {
    if (entity) {
      formRef.setFieldsValue({
        name: entity.name,
      });
    }
  }, [entity, formRef]);

  const editCategoryType = (updatedValues: CategoryType) => {
    setEntityId(id);
    setUpdatedEntity(updatedValues);
  };

  useEffect(() => {
    if (!loadingEdit && !errorEdit && responseEdit) {
      router.push("/category-type/get-all");
    }
  }, [errorEdit, loadingEdit, responseEdit, router]);

  return {
    editCategoryType,
  };
}
