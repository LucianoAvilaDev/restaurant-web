export const GetStyleByColorNameOutlined = (color: string) => {
  switch (color) {
    case "primary":
      return "border-blue-500 text-blue-500 focus:border-blue-700 hover:border-blue-400 focus:text-blue-700 hover:text-blue-400";

    case "secondary":
      return "border-purple-700 text-purple-700 focus:border-purple-900 hover:border-purple-500 focus:text-purple-900 hover:text-purple-500";

    case "default":
      return "border-gray-100 text-gray-100 focus:border-gray-200 hover:border-gray-50 focus:text-gray-200 hover:text-gray-50";

    case "success":
      return "border-green-700 text-green-700 focus:border-green-900 hover:border-green-400 focus:text-green-900 hover:text-green-400";

    case "danger":
      return "border-red-600 text-red-600 focus:border-red-800 hover:border-red-500 focus:text-red-800 hover:text-red-500";

    case "info":
      return "border-cyan-400 text-cyan-400 focus:border-cyan-600 hover:border-cyan-300 focus:text-cyan-600 hover:text-cyan-300";

    case "warning":
      return "border-amber-400 text-amber-400 focus:border-amber-600 hover:border-amber-300 focus:text-amber-600 hover:text-amber-300";

    default:
      return "border-blue-500 text-blue-500 focus:border-blue-700 hover:border-blue-400 focus:text-blue-700 hover:text-blue-400";
  }
};
