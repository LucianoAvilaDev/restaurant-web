import { array, object, string } from "yup";

export const RolesSchema = () => {
  return object({
    name: string()
      .required("Campo obrigatório!")
      .min(6, "No mínimo 6 caracteres")
      .max(100, "No máximo 100 caracteres"),
    permissions: array(),
  });
};
