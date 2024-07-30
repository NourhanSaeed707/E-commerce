import { GetServerSidePropsContext } from "next";

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
    const baseUrl = process.env.NEXT_PUBLIC_FRONTEND_UR;
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
    const isAdmin = data.authorities.some((user) => user.authority === "ADMIN");
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
