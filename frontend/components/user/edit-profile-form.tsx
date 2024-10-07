import React from "react";
import { Form } from "antd";
import { useAuth } from "@/context/auth-context";
import EditProfileFields from "./edit-profile-fields";
import useEditEntity from "@/hooks/general-crud/useEditEntity";

function EditProfileForm() {
  const { currentUser } = useAuth();
  const apiUrl = "/api/auth/edit";
  const { setEntityId, setUpdatedEntity } = useEditEntity(apiUrl);

  const onFinish = (values: any) => {
    currentUser && currentUser.id ? setEntityId(currentUser.id): "";
    setUpdatedEntity(values);
  };

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
