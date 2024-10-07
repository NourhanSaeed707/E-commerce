import React, { useState } from "react";
import { Menu } from "antd";
import EditProfileForm from "./edit-profile-form";
import MyOrders from "./my-order";

function Profile() {
  const [selectedKey, setSelectedKey] = useState("editProfile");

  const handleMenuClick = (e: any) => {
    setSelectedKey(e.key);
  };
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold my-4">My Profile</h1>
      <Menu
        onClick={handleMenuClick}
        selectedKeys={[selectedKey]}
        mode="horizontal"
        className="mb-6"
      >
        <Menu.Item key="editProfile">Edit Profile</Menu.Item>
        <Menu.Item key="myOrders">My Orders</Menu.Item>
      </Menu>
      <div className="content">
        {selectedKey === "editProfile" && <EditProfileForm />}
        {selectedKey === "myOrders" && <MyOrders />}
      </div>
    </div>
  );
}

export default Profile;
