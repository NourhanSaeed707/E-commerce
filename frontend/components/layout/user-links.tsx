import React, { useEffect } from "react";
import { linkStyles } from "./admin-links";
import Link from "next/link";
import { NAVBAR } from "@/constants/home";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

function UserLinks() {
  const { cartCount, setUserId } = useCart();
  const { currentUser, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    currentUser && currentUser.id ? setUserId(currentUser.id) : setUserId(null);
  }, [currentUser, setUserId]);

  return (
    <>
      <Link href="/products/get-all" className={linkStyles}>
        {NAVBAR.PRODUCTS}
      </Link>
      <Link href="/cart" className={`${linkStyles} relative`}>
        <ShoppingCartOutlined className="text-xl" />
        {cartCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
            {cartCount}
          </span>
        )}
      </Link>
      <Link href="/user/profile" onClick={() => router.push("/user/profile")}>
        <Avatar
          size="large"
          icon={<UserOutlined />}
          className="cursor-pointer"
        />
      </Link>
    </>
  );
}

export default UserLinks;
