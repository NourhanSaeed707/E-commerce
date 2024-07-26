import ListProduct from "@/components/products/ListProduct";
import { withAuth } from "@/helper/auth";
import { GetServerSideProps } from "next";

function GetAll() {
  return (
    <div>
      <ListProduct />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = withAuth();
export default GetAll;
