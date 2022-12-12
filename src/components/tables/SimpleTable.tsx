import React from "react";
import DataTable from "react-data-table-component";

type Props = {
  columns: any[];
  data: any[];
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
      borderRadius: "0.5rem 0.5rem 0  0",
      fontSize: "0.8rem",
      fontWeight: "bold",
      minHeight: "32px",
      color: "white",
      backgroundColor: "rgb(127 29 29)",
    },
  },

  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
      fontSize: "0.75rem",
    },
  },

  pagination: {
    style: {
      fontSize: "12px",
      minHeight: "20px",
      borderRadius: "0 0 0.5rem 0.5rem",
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

const SimpleTable = ({ columns, data }: Props) => {
  return (
    <div className="rounded-lg shadow-gray-300 shadow-md">
      <DataTable
        columns={columns}
        data={data}
        fixedHeader
        fixedHeaderScrollHeight="300px"
        highlightOnHover
        pagination
        persistTableHead
        responsive
        striped
        subHeaderWrap
        customStyles={customStyles}
      />
    </div>
  );
};

export default SimpleTable;
