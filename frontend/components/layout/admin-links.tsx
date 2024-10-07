import { NAVBAR } from "@/constants/home";
import Link from "next/link";
import React from "react";

export const linkStyles = "text-gray-800 hover:text-gray-600 dark:hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium";

function AdminLinks() {
  return (
    <>
      <Link href="/products/all" className={linkStyles}>
        {NAVBAR.PRODUCTS}
      </Link>
      <Link href="/category-type/all" className={linkStyles}>
        {NAVBAR.CATEGORY}
      </Link>
      <Link href="/colors/all" className={linkStyles}>
        {NAVBAR.COLOR}
      </Link>
      <Link href="/sizes/all" className={linkStyles}>
        {NAVBAR.SIZE}
      </Link>
    </>
  );
}

export default AdminLinks;


