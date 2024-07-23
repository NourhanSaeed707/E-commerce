import { GetColorImgFacade, ProductColor } from "@/types/product-color";
import useGetOneByObject from "../general-crud/useGetOneByObject";
import useGetOneEntity from "../general-crud/useGetOneEntity";

export default function useGetColorImgFacade(props: GetColorImgFacade) {
  // Get Product Color
  const apiGetProductColorUrl = "/api/product-color/get-one";
  const { entity: productColorEntity } = useGetOneByObject<ProductColor>(
    apiGetProductColorUrl,
    props
  );
  // Get images by product color
  const apiGetImagesUrl = "/api/images/get/images";
  const { entity: imageEntities } = useGetOneEntity(
    apiGetImagesUrl,
    productColorEntity && productColorEntity.id
  );

  return {
    imageEntities,
  };
}
