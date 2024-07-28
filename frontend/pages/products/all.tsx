import ListProduct from "@/components/products/ListProduct";
import { withAuth } from "@/helper/auth";
import FetchToken from "@/helper/token";
import { checkUserAuthentication } from "@/utils/checkUserAuthentication";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

function GetAll() {
  const [tokenState, setToken] = useState(null);
  useEffect(() => {
    const fetchToken = async () => {
      const { accessToken } = await FetchToken();
      setToken(accessToken.token);
    };
    fetchToken();
  }, []);

  return (
    <div>
      <ListProduct />
    </div>
  );
}

// export async function getServerSideProps(context: any) {
//   return withAuth(context)
// }

export const getServerSideProps: GetServerSideProps = checkUserAuthentication;
export default GetAll;
