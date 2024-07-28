import ListProduct from "@/components/products/ListProduct";
import { GetServerSideProps } from "next";
import client from "@/client/client";
import FetchToken from "@/helper/token";

export const checkUserAuthentication: GetServerSideProps = async (context) => {
  try {
    const { accessToken } = await FetchToken();
    const token = accessToken.token;
    console.log("tooooooken in chek auth: ", token);

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
    console.log("erroooooooor: ", error)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
};
