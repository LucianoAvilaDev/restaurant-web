import { toast } from "react-toastify";

export const SuccessAlert = (msg?: string) =>
  toast.success(msg ?? "Sucesso!", {
    position: "top-center",
    autoClose: 2500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    theme: "colored",
  });
