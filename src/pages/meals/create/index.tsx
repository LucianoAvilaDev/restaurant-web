import { GetServerSideProps } from "next";
import React from "react";
import Navigation from "../../../components/navigation/Navigation";
import validateAuth from "../../../services/validateAuth";

const index = () => {
  return (
    <Navigation>
      <div>create meal</div>
    </Navigation>
  );
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
