import { toast } from "react-toastify";

export const InfoAlert = (msg?: string) =>
  toast.info(msg ?? "Muito importante", {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
  });
