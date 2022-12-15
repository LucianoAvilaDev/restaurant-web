import { boolean, object, string } from "yup";

export const TablesSchema = () => {
  return object({
    number: string()
      .required("Campo obrigatório!")
      .min(1, "No mínimo 1 caracteres")
      .max(10, "No máximo 10 caracteres"),
    isAvailable: boolean().required("Campo obrigatório!"),
  });
};
