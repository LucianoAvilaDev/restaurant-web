import { cpf } from "cpf-cnpj-validator";
import { object, string } from "yup";

export const ClientsSchema = () => {
  return object({
    name: string()
      .typeError("Valor inválido")
      .required("Campo obrigatório!")
      .min(6, "No mínimo 6 caracteres")
      .max(100, "No máximo 100 caracteres"),
    cpf: string()
      .required("Campo obrigatório!")
      .test("is-cnpj", "CPF inválido!", (value?: string) =>
        cpf.isValid(value ?? "")
      ),
  });
};
