import { Category } from "./Category";

export interface Item {
  id: number;
  name: string;
  categoryId: number;
  category: Category;
}
