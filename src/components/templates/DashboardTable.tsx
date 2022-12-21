type Props = {
  table: any;
};

const DashboardTable = ({ table, ...props }: any) => {
  return (
    <>
      <div className={`col-span-4 py-4 px-2 cursor-pointer`}>
        <div
          className={`${
            table.is_available
              ? "bg-green-600 hover:bg-green-400"
              : "bg-red-600 hover:bg-red-400"
          } flex flex-col justify-center shadow-lg text-xs text-white font-medium border-4 border-double text-center p-2 rounded-lg w-28 h-20 sm:w-32 sm:h-24 `}
          {...props}
        >
          <div className="font-bold text-xl">{table.number}</div>
          <div className={`text-lg font-medium`}>
            {table.orders ? `Ped. ${table.orders[0].id}` : "Disponível"}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardTable;
