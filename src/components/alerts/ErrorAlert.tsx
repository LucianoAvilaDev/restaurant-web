import { toast } from "react-toastify";

export const ErrorAlert = (msg?: string) =>
  toast.error(msg ?? "Erro", {
    position: "top-center",
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    theme: "colored",
  });
