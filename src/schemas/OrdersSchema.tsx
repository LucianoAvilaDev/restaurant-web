import { array, boolean, date, number, object } from "yup";

export const OrdersSchema = () => {
  return object({
    date: date(),
    totalValue: number()
      .typeError("Valor inválido")
      .required("Campo obrigatório!")
      .positive("O Preço deve ser positivo!")
      .min(0.01, "O preço mínimo é 0,01!")
      .max(99999999.99, "O preço máximo é 99999999,99!"),
    paidValue: number()
      .typeError("Valor inválido")
      .required("Campo obrigatório!")
      .positive("O Preço deve ser positivo!")
      .min(0.0, "O preço mínimo é 0!")
      .max(99999999.99, "O preço máximo é 99999999,99!"),
    clientId: number(),
    tableId: number(),
    isClosed: boolean().required("Campo obrigatório!"),
    orderItems: array(),
  });
};
