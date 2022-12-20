export const SimpleCard = ({ title, children }: any) => {
  return (
    <>
      <div className="max-w-sm w-full border border-gray-200 bg-white rounded-lg shadow-gray-500 shadow-md ">
        <header className={`flex mx-2 flex-col  items-center justify-center`}>
          <div className="p-2 antialiased border-b w-full text-center text-2xl font-medium text-gray-900">
            {title}
          </div>
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
