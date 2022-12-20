import { toast } from "react-toastify";

export const ErrorAlert = (msg?: string) =>
  toast.error(msg ?? "Houve um erro! Tente novamente mais Tarde.", {
    position: "top-center",
    autoClose: 2500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    theme: "colored",
  });
