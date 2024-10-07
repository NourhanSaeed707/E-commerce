import React from "react";
import { AppProps } from "next/app";
import "../styles/global.css";
import CurrentUserProvider from "@/context/auth-context";
import RegisterUserProvider from "@/context/register-user-context";
import { CartProvider } from "@/context/cart-context";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <CurrentUserProvider>
        <RegisterUserProvider>
          <CartProvider>
            <Component {...pageProps} />
          </CartProvider>
        </RegisterUserProvider>
      </CurrentUserProvider>
    </>
  );
};

export default MyApp;
