import { GetServerSidePropsContext } from "next";
import { Authority } from "@/types/authority";
export const checkUserAuthentication = async (
  context: GetServerSidePropsContext
) => {
  const token = context.req.headers.cookie?.split("token=")[1];
  if (!token) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  try {
    const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;
    const res = await fetch(`${baseUrl}/api/get-user`, {
      headers: {
        cookie: context.req.headers.cookie,
      },
    });
    if (!res.ok) {
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      };
    }
    const data = await res.json();
    console.log("daaaaaaaaata user: ", data);
    console.log(data.authorities);
    const isAdmin = data.authorities.some(
      (user) => user.authority === Authority.ADMIN
    );
    console.log("isAdmiiiiiiiiin: ", isAdmin);
    if (!isAdmin) {
      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      };
    }
    return {
      props: { data },
    };
  } catch (error) {
    console.error("Error during data fetch:", error);
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
};
