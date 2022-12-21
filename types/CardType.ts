export type CardType = {
  title: string;
  value: string;
  footerText?: string;
  color:
  | "primary"
  | "secondary"
  | "default"
  | "info"
  | "success"
  | "warning"
  | "danger";
};