import EditCategory from "@/components/category-type/EditCategory";
import { checkUserAuthentication } from "@/utils/checkUserAuthentication";
import { GetServerSideProps } from "next";
import React from "react";

function EditPage() {
  return <EditCategory />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return checkUserAuthentication(context);
};

export default EditPage;
