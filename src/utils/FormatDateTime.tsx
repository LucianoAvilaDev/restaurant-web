export const FormatDateTime = (date: string) => {
  return new Date(date).toISOString().slice(0, 16);
};
