import React from "react";

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
  let styleButton: string;

  switch (color) {
    case "primary":
      styleButton =
        "bg-blue-500 text-white focus:bg-blue-700 hover:bg-blue-400";
      break;
    case "secondary":
      styleButton =
        "bg-purple-700 text-white focus:bg-purple-900 hover:bg-purple-500";
      break;
    case "default":
      styleButton = "bg-gray-100 text-black focus:bg-gray-200 hover:bg-gray-50";
      break;
    case "success":
      styleButton =
        "bg-green-600 text-white focus:bg-green-800 hover:bg-green-400";
      break;
    case "danger":
      styleButton = "bg-red-600 text-white focus:bg-red-800 hover:bg-red-500";
      break;
    case "info":
      styleButton =
        "bg-cyan-400 text-black focus:bg-cyan-600 hover:bg-cyan-300";
      break;
    case "warning":
      styleButton =
        "bg-amber-400 text-black focus:bg-amber-600 hover:bg-amber-300";
      break;
    default:
      styleButton =
        "bg-blue-500 text-white focus:bg-blue-700 hover:bg-blue-400";
  }

  return (
    <button
      id={id}
      type={type ?? "button"}
      className={`${styleButton} relative w-full flex justify-center py-2 px-2 border border-transparent text-sm font-medium rounded-md shadow-md shadow-gray-300 hover:shadow-gray-500 `}
      onClick={() => {
        onClick ? onClick() : null;
      }}
    >
      {label}
    </button>
  );
};
