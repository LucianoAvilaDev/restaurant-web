export const GetStyleByColorNameOutlined = (color: string) => {
  switch (color) {
    case "primary":
      return "text-blue-500 focus:hover:focus:text-blue-700 hover:text-blue-400";

    case "secondary":
      return "text-purple-700 focus:hover:focus:text-purple-900 hover:text-purple-500";

    case "default":
      return "text-gray-100 focus:hover:focus:text-gray-200 hover:text-gray-50";

    case "success":
      return "text-green-700 focus:hover:focus:text-green-900 hover:text-green-400";

    case "danger":
      return "text-red-600 focus:hover:focus:text-red-800 hover:text-red-500";

    case "info":
      return "text-cyan-400 focus:hover:focus:text-cyan-600 hover:text-cyan-300";

    case "warning":
      return "text-amber-400 focus:hover:focus:text-amber-600 hover:text-amber-300";

    default:
      return "text-blue-500 focus:hover:focus:text-blue-700 hover:text-blue-400";
  }
};
