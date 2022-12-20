import { number, object, string } from "yup";

export const OrderItemsSchema = () => {
  return object({
    quantity: number()
      .typeError("Valor inválido")
      .required("Campo obrigatório!")
      .positive("O Preço deve ser positivo!")
      .min(0.01, "O preço mínimo é 0!")
      .max(999999.99, "O preço máximo é 999999,99!"),
    price: number()
      .typeError("Valor inválido")
      .required("Campo obrigatório!")
      .positive("O Preço deve ser positivo!")
      .min(0.01, "O preço mínimo é 0!")
      .max(99999999.99, "O preço máximo é 99999999,99!"),
    mealId: number(),
    observation: string(),
  });
};
