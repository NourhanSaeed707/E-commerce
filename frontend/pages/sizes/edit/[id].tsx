import EditSize from "@/components/sizes/EditSize";
import { checkUserAuthentication } from "@/utils/checkUserAuthentication";
import { GetServerSideProps } from "next";
import React from "react";

function EditPage() {
  return (
    <div>
      <EditSize />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return checkUserAuthentication(context);
};
export default EditPage;
