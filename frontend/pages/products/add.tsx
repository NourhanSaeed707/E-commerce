import AddProduct from "@/components/products/add-product";
import { checkUserAuthentication } from "@/utils/checkUserAuthentication";
import { GetServerSideProps } from "next";
import React from "react";

function Add() {
  return (
    <div>
      <AddProduct />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return checkUserAuthentication(context);
};
export default Add;
