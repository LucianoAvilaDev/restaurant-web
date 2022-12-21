type Props = {
  title: string;
  children: any;
};

export const InnerCard = ({ title, children }: any) => {
  return (
    <>
      <div className="w-full border border-gray-200 bg-white rounded-lg shadow-gray-500 shadow-md ">
        <header className={`flex mx-2 items-center border-b justify-center`}>
          <div className="p-2 antialiased  w-full text-start text-xl font-medium text-gray-900">
            {title}
          </div>
        </header>
        <main className={`px-4`}>{children}</main>
      </div>
    </>
  );
};
