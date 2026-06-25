export type OrderStatus =
  | "Confirmed"
  | "Preparing"
  | "Ready"
  | "Collected";

export interface Order {
  id: string;
  items: string[];
  status: OrderStatus;
  estimatedTime: string;
}