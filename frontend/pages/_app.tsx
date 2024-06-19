import React from "react";
import { AppProps } from "next/app";
import "../styles/global.css";
import  CurrentUserProvider  from "@/context/AuthContext";
import RegisterUserProvider from "@/context/RegisterUserContext";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <CurrentUserProvider>
        <RegisterUserProvider>
          <Component {...pageProps} />
        </RegisterUserProvider>
      </CurrentUserProvider>
    </>
  );
};

export default MyApp;
