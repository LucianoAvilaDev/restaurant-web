import { number, object, string } from "yup";

export const UsersSchema = () => {
  return object({
    name: string()
      .required("Campo obrigatório!")
      .min(6, "No mínimo 6 caracteres")
      .max(200, "No máximo 200 caracteres"),
    email: string().email(),
    password: string()
      .required("Campo obrigatório!")
      .min(6, "No mínimo 6 caracteres")
      .max(200, "No máximo 200 caracteres"),
    passwordConfirm: string().test(
      "passwords-match",
      "Senhas não são iguais!",
      function (value) {
        return this.parent.password === value;
      }
    ),

    roleId: number().required("Campo obrigatório!"),
  });
};
