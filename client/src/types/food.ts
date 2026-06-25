export interface FoodItem {
  id: string;
  name: string;
  price: number;
  image: string;

  category: string;

  ordersToday: number;
  recommended: boolean;

  requiresPreparation: boolean;
  prepTime: number;
}