import { toast } from "react-toastify";

export const WarningAlert = (msg?: string) =>
  toast.warning(msg ?? "Atenção!", {
    position: "top-center",
    autoClose: 2500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    theme: "colored",
  });
