import ListCategoryType from "@/components/category-type/list-category-type";
import { checkUserAuthentication } from "@/utils/checkUserAuthentication";
import { GetServerSideProps } from "next";
import React from "react";

function GetAll() {
  return <ListCategoryType />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return checkUserAuthentication(context);
};

export default GetAll;
