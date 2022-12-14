import React from "react";
import { GetStyleByColorName } from "../../utils/GetStyleByColorName";

type Props = {
  id: string;
  label: string;
  color:
    | "primary"
    | "secondary"
    | "default"
    | "info"
    | "success"
    | "warning"
    | "danger";
  type?: "submit";
  onClick?: Function;
};

export const ButtonSolid = ({ id, label, color, type, onClick }: Props) => {
  const styleButton: string = GetStyleByColorName(color);

  return (
    <button
      id={id}
      type={type ?? "button"}
      className={`${styleButton} relative w-full flex justify-center py-1 px-2 border border-transparent text-sm font-medium rounded-md shadow-md shadow-gray-300 hover:shadow-gray-500 `}
      onClick={async () => {
        onClick ? await onClick() : null;
      }}
    >
      {label}
    </button>
  );
};