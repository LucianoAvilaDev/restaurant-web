const DashboardTable = ({ table, ...props }: any) => {
  return (
    <div className={`col-span-4 py-4 px-2 cursor-pointer`}>
      <div
        className={`${
          table.is_available ? "text-green-600" : "text-red-500 "
        } bg-gray-300 hover:bg-gray-100  shadow-gray-300 hover:shadow-gray-500 flex flex-col justify-center shadow-lg text-xs text-white font-medium border-2 border-double text-center p-2 rounded-lg w-28 h-20 sm:w-32 sm:h-24 `}
        {...props}
      >
        <div className="font-bold text-2xl">{table.number}</div>
        <div className={`text-lg font-medium`}>
          {table.orders ? `Ped. ${table.orders[0].id}` : "Disponível"}
        </div>
      </div>
    </div>
  );
};

export default DashboardTable;
