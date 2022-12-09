import React from "react";
import { RiErrorWarningLine } from "react-icons/ri";

const ErrorLabel = ({ children }: any) => {
  return (
    <>
      <div
        className={`flex items-center py-1 space-x-1 text-red-500 text-sm font-medium`}
      >
        <RiErrorWarningLine size={22} />
        <div>{children}</div>
      </div>
    </>
  );
};

export default ErrorLabel;
