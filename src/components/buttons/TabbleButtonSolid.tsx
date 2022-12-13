import React from "react";
import { GetStyleByColorName } from "../../utils/GetStyleByColorName";

type Props = {
  id: string;
  tooltip: string;
  color:
    | "primary"
    | "secondary"
    | "default"
    | "info"
    | "success"
    | "warning"
    | "danger";
  type?: "submit";
  icon?: any;
  onClick?: Function;
};

export const TableButtonSolid = ({
  id,
  tooltip,
  color,
  type,
  icon,
  onClick,
}: Props) => {
  const styleButton: string = GetStyleByColorName(color);

  return (
    <button
      id={id}
      title={tooltip}
      type={type ?? "button"}
      className={`${styleButton} items-center w-6 h-6 flex justify-center p-1 border border-transparent text-sm font-medium rounded-full shadow-md shadow-gray-300 hover:shadow-gray-500 `}
      onClick={() => {
        onClick ? onClick() : null;
      }}
    >
      {icon}
    </button>
  );
};
