import EditProducts from "@/components/products/edit-products";
import { checkUserAuthentication } from "@/utils/checkUserAuthentication";
import { GetServerSideProps } from "next";
import React from "react";

function EditPage() {
  return (
    <div>
      <EditProducts />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return checkUserAuthentication(context);
};

export default EditPage;
