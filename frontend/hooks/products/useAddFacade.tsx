import useGetAllEntity from "../general-crud/useGetAllEntity";

export default function useAddFacade() {
  const apiCategoryTypeUrl = "api/category-type/get-all";
  const apiColorUrl = "api/colors/get-all";
  const apiSizeUrl = "api/sizes/get-all";
  const {entities : categoryTypeEntities , errors: errorCategoryType, loading: loadingCategoryType} = useGetAllEntity(apiCategoryTypeUrl);
  const {entities : colorsEntities , errors: errorColor, loading: loadingColor} = useGetAllEntity(apiColorUrl);
  const {entities : sizeEntities , errors: errorSize, loading: loadingSize} = useGetAllEntity(apiSizeUrl);

  return {
    categoryTypeEntities,
    colorsEntities,
    sizeEntities
  }
}
