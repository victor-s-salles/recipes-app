export const DRINKS = 'DRINKS';
export const MEALS = 'MEALS';

export const recipesDrinks = (drinksValue) => ({
  type: 'DRINKS',
  drinks: drinksValue,
});

export const recipesMeals = (mealsValue) => ({
  type: 'MEALS',
  meals: mealsValue,
});
