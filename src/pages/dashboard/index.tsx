import { GetServerSideProps } from "next";
import { Head } from "next/document";
import React from "react";
import { getApiClient } from "../../services/getApiClient";
import validateAuth from "../../services/validateAuth";

const index = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div>dashboard</div>;
    </>
  );
};

export default index;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = getApiClient(ctx);

  if (!(await validateAuth(ctx))) {
    return {
      redirect: {
        destination: "login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
