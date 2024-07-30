import ListSize from "@/components/sizes/ListSize";
import { checkUserAuthentication } from "@/utils/checkUserAuthentication";
import { GetServerSideProps } from "next";
import React from "react";

function AllPage() {
  return <ListSize />;
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  return checkUserAuthentication(context);
};
export default AllPage;
