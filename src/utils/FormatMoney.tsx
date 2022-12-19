export const FormatMoney = (value: string | number): string => {
  return `R$ ${(+value).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
  })}`;
};
