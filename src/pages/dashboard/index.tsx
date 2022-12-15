import { GetServerSideProps } from "next";
import { Head } from "next/document";
import React, { useContext } from "react";
import { BodyCard } from "../../components/cards/BodyCard";
import Navigation from "../../components/navigation/Navigation";
import { AuthContext } from "../../contexts/AuthContext";
import validateAuth from "../../services/validateAuth";

const index = () => {
  const { user } = useContext(AuthContext);
  return (
    <Navigation>
      <div className={`px-3 w-full`}>
        <BodyCard title={`Refeições`}>
          <div className="px-2 pt-2 pb-6">
            <h2>Bem-vindo, {user?.name}</h2>
          </div>
        </BodyCard>
      </div>
    </Navigation>
  );
};

export default index;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
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
