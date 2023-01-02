import { MealTypeType } from "./MealTypeType";

export type MealType = {
  id: string;
  name: string;
  description: string;
  price: number;
  mealTypeId: number;
  mealType: MealTypeType;
};
