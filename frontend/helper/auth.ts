import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import FetchToken from "./token";
import { useState } from "react";
import { getCookie } from "typescript-cookie";

export const withAuth = (
  getServerSidePropsFunc?: (
    context: GetServerSidePropsContext
  ) => Promise<GetServerSidePropsResult<any>>
) => {
  return async (context: GetServerSidePropsContext) => {
    // const [tokenState, setToken] = useState<string | null>('');
    // const { accessToken } = await FetchToken();
    // const token = accessToken.token;
    const token = getCookie("token");
    console.log("tooooooooooken: ", token)
    console.log("insiiiiiide get server side:");
    const { res, req } = context;
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const response = await fetch(`${baseUrl}/api/get-user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("reeeeeeeeeespooonse in auth: ", response);
    if (response.ok) {
      const user = await response.json();
      return {
        props: {
          user,
        },
      };
    } else {
      const redirect = {
        redirect: {
          permanent: false,
          destination: "/auth/login",
        },
      };
      return redirect;
      //   res.end();
    }
  };
};
