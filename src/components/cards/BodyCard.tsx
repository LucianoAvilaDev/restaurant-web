type Props = {
  title: string;
  newButton?: any;
};

export const BodyCard = ({ title, newButton, children }: any) => {
  return (
    <>
      <div className="w-full border border-gray-200 bg-white rounded-lg shadow-gray-500 shadow-md ">
        <header className={`flex mx-2 items-center border-b justify-center`}>
          <div className="p-2 antialiased truncate w-full text-start text-2xl font-medium text-gray-900">
            {title}
          </div>
          <div className={`px-1 py-1 sm:w-44`}>{newButton ?? null}</div>
        </header>
        <main className={`px-4`}>{children}</main>
        <footer
          className={`flex border-t text-sm flex-col items-center justify-center mx-2`}
        >
          <div className="w-full font-normal antialiased text-center truncate py-2">
            ©{process.env.NEXT_PUBLIC_OWNER} {new Date().getFullYear()}
          </div>
        </footer>
      </div>
    </>
  );
};
