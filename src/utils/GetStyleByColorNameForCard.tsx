export const GetStyleByColorNameForCard = (color: string) => {
  switch (color) {
    case "primary":
      return "bg-blue-500 text-white hover:bg-blue-400";

    case "secondary":
      return "bg-gray-700 text-white hover:bg-gray-500";

    case "default":
      return "bg-gray-100 text-black hover:bg-gray-50";

    case "success":
      return "bg-green-600 text-white hover:bg-green-400";

    case "danger":
      return "bg-red-600 text-white hover:bg-red-500";

    case "info":
      return "bg-cyan-400 text-white hover:bg-cyan-300";

    case "warning":
      return "bg-amber-400 text-black hover:bg-amber-300";

    default:
      return "bg-blue-500 text-white hover:bg-blue-400";
  }
};
