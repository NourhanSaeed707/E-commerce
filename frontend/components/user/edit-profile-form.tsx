import React, { useEffect } from "react";
import { Form } from "antd";
import { useAuth } from "@/context/auth-context";
import EditProfileFields from "./edit-profile-fields";

function EditProfileForm() {
  const { currentUser } = useAuth();
  const onFinish = (values: any) => {
    // Handle profile update
    console.log("Updated profile values: ", values);
  };
  useEffect(() => {
    console.log("current user in profile page: ", currentUser);
  }, [currentUser]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold my-4">Profile</h1>
      {currentUser ? (
        <Form
          initialValues={{
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            email: currentUser.email,
            mobile: currentUser.mobile,
          }}
          onFinish={onFinish}
        >
          <EditProfileFields />
        </Form>
      ) : (
        <p>Please log in to view and edit your profile.</p>
      )}
    </div>
  );
}

export default EditProfileForm;
