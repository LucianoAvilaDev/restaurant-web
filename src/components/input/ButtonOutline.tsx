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
};

export const ButtonOutline = ({ id, label, color, type }: Props) => {
  let styleButton: string;

  switch (color) {
    case "primary":
      styleButton =
        "border-blue-500 text-blue-500 focus:border-blue-700 hover:border-blue-400 focus:text-blue-700 hover:text-blue-400";
      break;
    case "secondary":
      styleButton =
        "border-purple-700 text-purple-700 focus:border-purple-900 hover:border-purple-500 focus:text-purple-900 hover:text-purple-500";
      break;
    case "default":
      styleButton =
        "border-gray-100 text-gray-100 focus:border-gray-200 hover:border-gray-50 focus:text-gray-200 hover:text-gray-50";
      break;
    case "success":
      styleButton =
        "border-green-700 text-green-700 focus:border-green-900 hover:border-green-400 focus:text-green-900 hover:text-green-400";
      break;
    case "danger":
      styleButton =
        "border-red-600 text-red-600 focus:border-red-800 hover:border-red-500 focus:text-red-800 hover:text-red-500";
      break;
    case "info":
      styleButton =
        "border-cyan-400 text-cyan-400 focus:border-cyan-600 hover:border-cyan-300 focus:text-cyan-600 hover:text-cyan-300";
      break;
    case "warning":
      styleButton =
        "border-amber-400 text-amber-400 focus:border-amber-600 hover:border-amber-300 focus:text-amber-600 hover:text-amber-300";
      break;
    default:
      styleButton =
        "border-blue-500 text-blue-500 focus:border-blue-700 hover:border-blue-400 focus:text-blue-700 hover:text-blue-400";
  }

  return (
    <button
      id={id}
      type={type}
      className={`${styleButton} relative w-full flex justify-center py-1 px-2 border-2 border-transparent text-md font-medium rounded-md shadow-gray-300 hover:shadow-gray-500 `}
    >
      {label}
    </button>
  );
};
