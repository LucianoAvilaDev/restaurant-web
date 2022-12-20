import { MealType } from './MealType';
export type OrderItemsType = {
  id: string;
  key: string

  observation: string;
  quantity: number
  price: number
  meal: MealType
  meal_id: string
  order_id: string
};
