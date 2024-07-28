import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import axios from "axios";
import { getIronSession } from "iron-session";
import client from "@/client/client";
import FetchToken from "./token";

export const withAuth = (
  getServerSidePropsFunc?: (
    context: GetServerSidePropsContext
  ) => Promise<GetServerSidePropsResult<any>>
) => {
  return async (context: GetServerSidePropsContext) => {
    const { req, res } = context;
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

    
    try {
      // const user = req.cookies;
      // console.log("coooooooookies: ", user);

      // if (!user || !user.token) {
      //   throw new Error("No token found");
      // }

      // const response = await axios.get(`${baseUrl}/api/v2/auth/user`, {
      //   headers: {
      //     Authorization: `Bearer ${user.token}`,
      //   },
      // });
      const { accessToken } = await FetchToken();
      const token = accessToken.token;
  
      if (!token) {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }
  
      const response = await client.get("/api/get-user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      console.log("reeeeeeeeesponse: ", response);

      if (response.status === 200) {
        console.log("if condiiiiition");
        const userData = response.data;
        return {
          props: {
            user: userData,
          },
        };
      } else {
        throw new Error("Invalid or expired token");
      }
    } catch (error) {
      console.log("errrrrrrrooooooooor");
      console.error("Authentication error:", error.message);
      return {
        redirect: {
          permanent: false,
          destination: "/auth/login",
        },
      };
    }
  };
};
