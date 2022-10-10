export interface IRecipe {
  id: number;
  title: string;
  description: string;
  ingredients: string;
  directions: string;
  recipeTips: string;
  nutritionFacts: string;
  createdBy: string | null;
  createdDate: string;
  lastUpdatedDate: string;
}
