import DataTable from "react-data-table-component";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type Props = {
  columns: any[];
  data: any[];
  pending: boolean;
};

const customStyles = {
  table: {
    style: {
      borderTop: "solid 1px rgb(240, 240, 240)",
      borderLeft: "solid 1px rgb(240, 240, 240)",
      borderRight: "solid 1px rgb(240, 240, 240)",
      borderRadius: "0.65rem 0.65rem 0  0",
    },
  },
  headRow: {
    style: {
      borderRadius: "0.3rem 0.3rem 0  0",
      fontSize: "0.8rem",
      fontWeight: "medium",
      minHeight: "32px",
      color: "white",
      backgroundColor: "rgb(127 29 29)",
    },
  },

  cells: {
    style: {
      fontSize: "0.8rem",

      minHeight: "50px",
    },
  },

  pagination: {
    style: {
      fontSize: "12px",
      minHeight: "20px",
    },
  },
  noData: {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
  },
};

const SimpleTable = ({ columns, data, pending }: Props) => {
  const progressComponent: any = (
    <>
      <div className="animate-spin">
        <AiOutlineLoading3Quarters />
      </div>
      <div className={`py-4 px-2 text-sm`}>Carregando...</div>
    </>
  );

  const noDataComponent: any = (
    <>
      <div className={`py-4 px-2 text-sm`}>Nenhum registro encontrado!</div>
    </>
  );

  return (
    <>
      <div className="border border-gray-200 rounded-md  shadow-gray-300 shadow-md">
        <DataTable
          responsive
          className="scrollbar-thin scrollbar-corner-gray-300 scrollbar-thumb-gray-300  hover:scrollbar-thumb-gray-400 scrollbar-track-gray-100 "
          columns={columns}
          data={data}
          fixedHeader
          fixedHeaderScrollHeight="300px"
          striped
          highlightOnHover
          customStyles={customStyles}
          progressPending={pending}
          progressComponent={progressComponent}
          noDataComponent={noDataComponent}
          defaultSortFieldId={1}
        />
      </div>
    </>
  );
};

export default SimpleTable;
