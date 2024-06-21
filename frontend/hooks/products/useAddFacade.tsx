import React from "react";
import useGetAllCategoryType from "../category-type/useGetAllCategoryType";

export default function useAddFacade() {
  const { categoryTypes } = useGetAllCategoryType();


  return {
    categoryTypes
  }
}
