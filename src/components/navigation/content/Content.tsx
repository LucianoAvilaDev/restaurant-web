import React from "react";
import Breadcrumb from "../breadcrumb/Breadcrumb";

const Content = ({ children }: any) => {
  return (
    <div className={`bg-themeBgBody h-full w-full`}>
      <Breadcrumb />

      <div>{children}</div>
    </div>
  );
};

export default Content;
