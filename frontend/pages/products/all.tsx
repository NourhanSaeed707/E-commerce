import ListProduct from "@/components/products/ListProduct";
import GetUserAuthority from "@/helper/get-authority";
import { checkUserAuthentication } from "@/utils/checkUserAuthentication";
import { GetServerSideProps } from "next";

function GetAll() {  
  return (
    <div>
      <ListProduct />
    </div>
  );
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  return checkUserAuthentication(context);
};

export default GetAll;
