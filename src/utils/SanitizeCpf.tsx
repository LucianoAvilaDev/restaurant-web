export const SanitizeCpf = (value: string) => {
  return value.replace(/[^\w\s]/gi, "");
};
