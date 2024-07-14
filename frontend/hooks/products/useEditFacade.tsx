import { useRouter } from "next/router";
import useGetOneEntity from "../general-crud/useGetOneEntity";
import useEditEntity from "../general-crud/useEditEntity";
import { useEffect } from "react";
import { EditProductFacadeProps, ProductForm } from "@/types/product";

export default function useEditFacade({
  id,
  formRef,
  setListingImages,
  listingImages,
}: EditProductFacadeProps) {
  const router = useRouter();
  const apiGetOneUrl = "/api/product/get";
  const apiEditUrl = "/api/product/edit";
  const { entity } = useGetOneEntity<ProductForm>(apiGetOneUrl, Number(id));
  const {
    setEntityId,
    setUpdatedEntity,
    loading: loadingEdit,
    error: errorEdit,
    response: responseEdit,
  } = useEditEntity<ProductForm>(apiEditUrl);

  useEffect(() => {
    if (entity) {
      formRef.setFieldsValue({
        name: entity.name,
        codeNumber: entity.codeNumber,
        price: entity.price,
        stock: entity.stock,
        gender: entity && entity.gender && entity.gender,
        categoryType: entity && entity.categoryType && entity.categoryType.id,
        size: entity && entity.size && entity.size.size,
        color: entity && entity.color && entity.color.color,
        images: entity.images,
      });
      setListingImages([...entity.images]);
    }
  }, [entity, formRef, setListingImages, id]);
  

  const editProduct = (updatedValues: ProductForm) => {
    setEntityId(id);
    setUpdatedEntity(updatedValues);
  };

  useEffect(() => {
    if (!loadingEdit && !errorEdit && responseEdit) {
      router.push("/products/all");
    }
  }, [errorEdit, loadingEdit, responseEdit, router]);

  return {
    editProduct,
    listingImages,
  };
}
