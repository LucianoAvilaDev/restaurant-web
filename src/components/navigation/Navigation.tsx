import React from "react";
import Content from "./content/Content";
import Navbar from "./navbar/Navbar";
import Sidebar from "./sidebar/Sidebar";

const Navigation = ({ children }: any) => {
  return (
    <>
      <div className={`flex w-full`}>
        <Sidebar />
        <div className={`flex flex-col justify-center w-full`}>
          <Navbar />
          <Content>{children}</Content>
        </div>
      </div>
    </>
  );
};

export default Navigation;
