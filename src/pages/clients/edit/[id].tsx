import { GetServerSideProps } from "next";
import React from "react";
import { getApiClient } from "../../../services/getApiClient";
import validateAuth from "../../../services/validateAuth";

type Props = {
  id: string;
};

const index = ({ id }: Props) => {
  return <div>{id}</div>;
};

export default index;

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  if (!(await validateAuth(ctx))) {
    return {
      redirect: {
        destination: "../login",
        permanent: false,
      },
    };
  }

  const id: string = ctx.params.id;
  return {
    props: {
      id: id,
    },
  };
};
