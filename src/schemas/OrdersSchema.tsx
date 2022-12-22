import { array, boolean, date, number, object } from "yup";

export const OrdersSchema = () => {
  return object({
    date: date(),
    totalValue: number()
      .typeError("Valor inválido")
      .required("Campo obrigatório!")
      .positive("O Preço deve ser positivo!"),
    paidValue: number()
      .typeError("Valor inválido")
      .required("Campo obrigatório!")
      .positive("O Preço deve ser positivo!")
      .min(0.0, "O preço mínimo é 0!")
      .max(99999999.99, "O preço máximo é 99999999,99!"),
    clientId: number().typeError("Campo obrigatório!"),
    tableId: number().typeError("Campo obrigatório!"),
    isClosed: boolean().required("Campo obrigatório!"),
    orderItems: array(),
  });
};
