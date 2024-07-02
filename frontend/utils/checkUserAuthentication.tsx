
import client from "@/client/client";
import FetchToken from "@/helper/token";
import { GetServerSideProps } from "next";

export const checkUserAuthentication: GetServerSideProps = async (context) => {
  try {
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

    if (!response.data) {
      throw new Error("User data not available");
    }

    return {
      props: { user: response.data },
    };
  } catch (error) {
    console.error("Authentication error:", error);

    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};