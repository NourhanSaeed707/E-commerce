import ListProduct from "@/components/products/ListProduct";
import { checkUserAuthentication } from "@/utils/checkUserAuthentication";
import { GetServerSideProps } from "next";

function GetAll({ data }) {
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
