import { number, object, string } from "yup";

export const MealsSchema = () => {
  return object({
    name: string()
      .required("Campo obrigatório!")
      .min(6, "No mínimo 6 caracteres")
      .max(100, "No máximo 100 caracteres"),
    price: number()
      .typeError("Valor inválido")
      .required("Campo obrigatório!")
      .positive("O Preço deve ser positivo!")
      .min(0.01, "O preço mínimo é 0,01!")
      .max(99999999.99, "O preço máximo é 99999999,99!"),
    mealTypeId: string().required("Campo obrigatório!"),
    description: string().max(300, "No máximo 300 caracteres"),
  });
};
