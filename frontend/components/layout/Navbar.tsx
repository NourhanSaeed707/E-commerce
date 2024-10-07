import { Authorities } from "@/constants/authorities";
import { NAVBAR } from "@/constants/home";
import { useAuth } from "@/context/auth-context";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useCart } from "@/context/cart-context";
import AdminLinks from "./admin-links";
import UserLinks from "./user-links";
import { MenuOutlined } from "@ant-design/icons";
import { Button } from "antd";
import MobileNavbar from "./mobile-navbar";

function Navbar() {
  const { currentUser, logout } = useAuth();
  const { cartCount, setUserId } = useCart();
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  useEffect(() => {
    currentUser && currentUser.id ? setUserId(currentUser.id) : setUserId(null);
  }, [currentUser, setUserId]);

  const toggleDrawer = () => {
    setIsDrawerVisible(!isDrawerVisible);
  };

  return (
    <header>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/">
              <Image src="/images/logo.png" alt="Logo" width={50} height={50} />
            </Link>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              icon={<MenuOutlined />}
              onClick={toggleDrawer}
              className="text-gray-800"
            />
          </div>
          {/* Regular navbar for desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/"
                className="text-gray-800 hover:text-gray-600 dark:hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                {NAVBAR.HOME}
              </Link>
              <Link
                href="/about"
                className="text-gray-800 hover:text-gray-600 dark:hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                {NAVBAR.ABOUT}
              </Link>
              {currentUser && currentUser.role === Authorities.ADMIN && <AdminLinks />}
              {currentUser ? (
                <Link
                  href="#"
                  className="text-gray-800 hover:text-gray-600 dark:hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
                  onClick={logout}
                >
                  {NAVBAR.LOGOUT}
                </Link>
              ) : (
                <Link
                  href="/auth/login"
                  className="text-gray-800 hover:text-gray-600 dark:hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {NAVBAR.LOGIN}
                </Link>
              )}
              {currentUser && currentUser.role === Authorities.USER && <UserLinks />}
            </div>
          </div>
        </div>
      </nav>
      {/* Drawer for mobile menu */}
      <MobileNavbar toggleDrawer={toggleDrawer} isDrawerVisible={isDrawerVisible} />
    </header>
  );
}

export default Navbar;
