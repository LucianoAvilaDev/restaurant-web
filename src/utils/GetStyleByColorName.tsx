export const GetStyleByColorName = (color: string) => {
  let styleButton: string = "";

  switch (color) {
    case "primary":
      return "bg-blue-500 text-white focus:bg-blue-700 hover:bg-blue-400";

    case "secondary":
      return "bg-gray-700 text-white focus:bg-black hover:bg-gray-500";

    case "default":
      return "bg-gray-100 text-black focus:bg-gray-200 hover:bg-gray-50";

    case "success":
      return "bg-green-600 text-white focus:bg-green-800 hover:bg-green-400";

    case "danger":
      return "bg-red-600 text-white focus:bg-red-800 hover:bg-red-500";

    case "info":
      return "bg-cyan-400 text-black focus:bg-cyan-600 hover:bg-cyan-300";

    case "warning":
      return "bg-amber-400 text-black focus:bg-amber-600 hover:bg-amber-300";

    default:
      return "bg-blue-500 text-white focus:bg-blue-700 hover:bg-blue-400";
  }
};
