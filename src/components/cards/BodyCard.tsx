import React from "react";

type Props = {
  title: string;
  newButton?: JSX.Element;
};

export const BodyCard = ({ title, newButton, children }: any) => {
  return (
    <>
      <div className="w-full border border-gray-200 bg-white rounded-lg shadow-gray-500 shadow-md ">
        <header className={`flex mx-2 items-center border-b justify-center`}>
          <h2 className="p-3 antialiased  w-full text-start text-2xl font-medium text-gray-900">
            {title}
          </h2>
          <div className={`px-4 sm:w-44`}>{newButton ?? null}</div>
        </header>
        <main className={`px-4`}>{children}</main>
        <footer
          className={`flex border-t text-sm flex-col items-center justify-center mx-2`}
        >
          <h2 className="w-full font-normal antialiased text-center truncate py-2">
            ©{process.env.NEXT_PUBLIC_OWNER} {new Date().getFullYear()}
          </h2>
        </footer>
      </div>
    </>
  );
};
