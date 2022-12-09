import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Content from "./content/Content";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";

const Navigation = ({ children }: any) => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      {isAuthenticated ? (
        <div className={`flex w-full`}>
          <Sidebar />
          <div className={`flex flex-col justify-center w-full`}>
            <Navbar />
            <Content>{children}</Content>
          </div>
        </div>
      ) : (
        <Content>{children}</Content>
      )}
    </>
  );
};

export default Navigation;
