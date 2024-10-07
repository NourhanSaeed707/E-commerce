import React from "react";
import { AppProps } from "next/app";
import "../styles/global.css";
import CurrentUserProvider from "@/context/auth-context";
import RegisterUserProvider from "@/context/register-user-context";
import { CartProvider } from "@/context/cart-context";
import Navbar from "@/components/layout/Navbar";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <CurrentUserProvider>
        <RegisterUserProvider>
          <CartProvider>
            <Navbar/>
            <Component {...pageProps} />
          </CartProvider>
        </RegisterUserProvider>
      </CurrentUserProvider>
    </>
  );
};

export default MyApp;
