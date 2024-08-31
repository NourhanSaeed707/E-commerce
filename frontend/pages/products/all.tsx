import ListProductAdmin from "@/components/products/list-products/ListProductAdmin";
import GetUserAuthority from "@/helper/get-authority";
import { checkUserAuthentication } from "@/utils/checkUserAuthentication";
import { GetServerSideProps } from "next";

function GetAll() {  
  return (
    <div>
      <ListProductAdmin />
    </div>
  );
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  return checkUserAuthentication(context);
};

export default GetAll;
