import React from "react";
import useGetAllCategoryType from "../category-type/useGetAllCategoryType";
import useGetAllEntity from "../general-crud/useGetAllEntity";

export default function useAddFacade() {
  const apiCategoryTypeUrl = "api/category-type/get-all";
  const apiColorUrl = "api/colors/get-all";
  const {entities : categoryTypeEntities , errors: errorCategoryType, loading: loadingCategoryType} = useGetAllEntity(apiCategoryTypeUrl);
  const {entities : colorsEntities , errors: errorColor, loading: loadingColor} = useGetAllEntity(apiColorUrl);
  // const { categoryTypes } = useGetAllCategoryType();


  return {
    categoryTypeEntities,
    colorsEntities
  }
}
