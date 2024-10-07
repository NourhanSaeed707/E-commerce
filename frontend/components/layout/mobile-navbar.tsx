import React from "react";
import { Drawer, Menu } from "antd";
import Link from "next/link";
import { NAVBAR } from "@/constants/home";
import { Authorities } from "@/constants/authorities";
import { useAuth } from "@/context/auth-context";
import AdminLinks from "./admin-links";
import UserLinks from "./user-links";

function MobileNavbar({ toggleDrawer, isDrawerVisible }) {
  const { currentUser, logout } = useAuth();

  return (
    <Drawer
      title="Menu"
      placement="right"
      closable={true}
      onClose={toggleDrawer}
      visible={isDrawerVisible}
    >
      <Menu mode="vertical">
        <Menu.Item key="home">
          <Link href="/">{NAVBAR.HOME}</Link>
        </Menu.Item>
        <Menu.Item key="about">
          <Link href="/about">{NAVBAR.ABOUT}</Link>
        </Menu.Item>
        {currentUser && currentUser.role === Authorities.ADMIN && (
          <AdminLinks />
        )}
        {currentUser ? (
          <Menu.Item key="logout" onClick={logout}>
            {NAVBAR.LOGOUT}
          </Menu.Item>
        ) : (
          <Menu.Item key="login">
            <Link href="/auth/login">{NAVBAR.LOGIN}</Link>
          </Menu.Item>
        )}
        {currentUser && currentUser.role === Authorities.USER && <UserLinks />}
      </Menu>
    </Drawer>
  );
}

export default MobileNavbar;
