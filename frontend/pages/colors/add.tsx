import AddColor from "@/components/colors/add-color";
import { checkUserAuthentication } from "@/utils/checkUserAuthentication";
import { GetServerSideProps } from "next";
import React from "react";

function AddPage() {
  return (
    <div>
      <AddColor />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return checkUserAuthentication(context);
};
export default AddPage;
