import { MealType } from './MealType';
export type OrderItemsType = {
  id: string;
  observation: string;
  quantity: number
  price: number
  meal: MealType
  order_id: number
};
