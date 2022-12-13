import { GetServerSideProps } from "next";
import React from "react";
import { getApiClient } from "../../../services/getApiClient";
import validateAuth from "../../../services/validateAuth";

const index = () => {
  return <div>index</div>;
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

  return {
    props: {},
  };
};
