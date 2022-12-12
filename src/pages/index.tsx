import { GetServerSideProps } from "next";
import validateAuth from "../services/validateAuth";

export default function Home() {
  return <></>;
}
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (!(await validateAuth(ctx))) {
    return {
      redirect: {
        destination: "login",
        permanent: false,
      },
    };
  }

  return {
    redirect: {
      destination: "dashboard",
      permanent: false,
    },
  };
};
