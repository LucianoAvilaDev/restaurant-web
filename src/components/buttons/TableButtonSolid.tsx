import React from "react";
import { GetStyleByColorName } from "../../utils/GetStyleByColorName";
import { GetStyleByColorNameOutlined } from "../../utils/GetStyleByColorNameOutlined";

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
  const styleButton: string = GetStyleByColorNameOutlined(color);

  return (
    <button
      id={id}
      title={tooltip}
      type={type ?? "button"}
      className={`${styleButton} items-center flex justify-center p-1 text-sm font-medium shadow-gray-300 hover:shadow-gray-500 `}
      onClick={() => {
        onClick ? onClick() : null;
      }}
    >
      {icon}
    </button>
  );
};
