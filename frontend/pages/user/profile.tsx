import EditProfileForm from "@/components/user/edit-profile-form";
import React from "react";
import { checkUserAuthentication } from "@/utils/checkUserAuthentication";
import { GetServerSideProps } from "next";

function ProfilePage() {
  return (
    <>
      <EditProfileForm />
    </>
  );
}
  
export default ProfilePage;
