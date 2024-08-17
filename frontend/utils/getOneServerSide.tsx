import { GetOneService } from "@/services/general/getOneService";
import { GetServerSidePropsContext } from "next";

type GetOneProps = {
  context: GetServerSidePropsContext;
  Id: number;
  apiUrl: string;
};

export const GetOneServerSide = async ({
  context,
  Id,
  apiUrl,
}: GetOneProps) => {
  const props = {
    apiUrl,
    token: "",
    id: Id,
  };

  const product = await GetOneService(props);

  return {
    props: {
      product,
    },
  };
};
