import EditColor from "@/components/colors/edit-color";
import { checkUserAuthentication } from "@/utils/checkUserAuthentication";
import { GetServerSideProps } from "next";
import React from "react";

function EditPage() {
  return (
    <div>
      <EditColor />
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  return checkUserAuthentication(context);
};
export default EditPage;
