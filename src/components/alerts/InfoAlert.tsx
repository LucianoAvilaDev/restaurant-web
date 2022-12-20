import { toast } from "react-toastify";

export const InfoAlert = (msg?: string | JSX.Element) =>
  toast.info(msg ?? "Muito importante!", {
    position: "top-center",
    autoClose: 2500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
  });
