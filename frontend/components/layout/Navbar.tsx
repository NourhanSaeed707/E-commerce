import { Authorities } from "@/constants/authorities";
import { NAVBAR } from "@/constants/home";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

function Navbar() {
  const { currentUser, logout } = useAuth();

  return (
    <header>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image src="/images/logo.png" alt="Logo" width={50} height={50} />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/"
                className="text-gray-800 hover:text-gray-600  dark:hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                {NAVBAR.HOME}
              </Link>
              <Link
                href=""
                className="text-gray-800 hover:text-gray-600  dark:hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                {NAVBAR.ABOUT}
              </Link>
              {currentUser && currentUser.role === Authorities.ADMIN && (
                <>
                  <Link
                    href="/products/all"
                    className="text-gray-800 hover:text-gray-600  dark:hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {NAVBAR.PRODUCTS}
                  </Link>
                  <Link
                    href="/category-type/get-all"
                    className="text-gray-800 hover:text-gray-600  dark:hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {NAVBAR.CATEGORY}
                  </Link>
                </>
              )}
              {currentUser ? (
                <Link
                  href="#"
                  className="text-gray-800 hover:text-gray-600  dark:hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
                  onClick={logout}
                >
                  {NAVBAR.LOGOUT}
                </Link>
              ) : (
                <Link
                  href="/auth/login"
                  className="text-gray-800 hover:text-gray-600  dark:hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {NAVBAR.LOGIN}
                </Link>
              )}
            </div>
          </div>
          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              type="button"
              className="bg-gray-200 inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-600"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed. Heroicon name: menu */}
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
              {/* Icon when menu is open. Heroicon name: x */}
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      {/* Mobile Menu */}
      <div className="md:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/"
            className="text-gray-800 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-400 block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>

          <Link
            href="/about"
            className="text-gray-800 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-400 block px-3 py-2 rounded-md text-base font-medium"
          >
            About
          </Link>
          <Link
            href="/auth/login"
            className="text-gray-800 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-400 block px-3 py-2 rounded-md text-base font-medium"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
