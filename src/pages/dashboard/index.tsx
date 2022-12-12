import { GetServerSideProps } from "next";
import { Head } from "next/document";
import React, { useContext } from "react";
import Navigation from "../../components/navigation/Navigation";
import { AuthContext } from "../../contexts/AuthContext";
import { getApiClient } from "../../services/getApiClient";
import validateAuth from "../../services/validateAuth";

const index = () => {
  return (
    <Navigation>
      <div>dashboard</div>
    </Navigation>
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
