import useGetAllEntity from "../general-crud/useGetAllEntity";

export default function useAddFacade() {
  const apiCategoryTypeUrl = "api/category-type/get-all";
  const apiColorUrl = "api/colors/get-all";
  const apiSizeUrl = "api/sizes/get-all";
  const {entities : categoryTypeEntities , errors: errorCategoryType, loading: loadingCategoryType} = useGetAllEntity(apiCategoryTypeUrl, false);
  const {entities : colorsEntities , errors: errorColor, loading: loadingColor} = useGetAllEntity(apiColorUrl, false);
  const {entities : sizeEntities , errors: errorSize, loading: loadingSize} = useGetAllEntity(apiSizeUrl, false);

  return {
    categoryTypeEntities,
    colorsEntities,
    sizeEntities
  }
}
