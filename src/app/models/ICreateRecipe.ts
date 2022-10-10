export interface ICreateRecipe{
    title:string;
    description:string;
    ingredients:string;
    directions:string
    recipeTips:string
    nutritionFacts:string
    image:any,
    createdBy:string|null
}