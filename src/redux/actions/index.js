import getRecipes from '../../services/getRecipes';
import getRecipeForId from '../../services/getRecipeForId';

export const REQUEST_RECIPES = 'REQUEST_RECIPES';
export const RECEIVE_RECIPE_FOR_ID = 'RECEIVE_RECIPE_FOR_ID';
export const RECEIVE_RECIPES = 'RECEIVE_RECIPES';
export const DRINKS = 'DRINKS';
export const MEALS = 'MEALS';

const requestRecipes = () => ({
  type: REQUEST_RECIPES,
});

const receiveRecipeforId = (recipeId) => ({
  type: RECEIVE_RECIPE_FOR_ID,
  payload: recipeId,
});

export const receiveRecipes = (recipes) => ({
  type: RECEIVE_RECIPES,
  payload: recipes,
});

export function fetchRecipeId(url, id) {
  return async (dispatch) => {
    dispatch(requestRecipes());
    const recipeId = await getRecipeForId(url, id);
    return dispatch(receiveRecipeforId(recipeId));
  };
}

export function fetchAllRecipes(url) {
  return async (dispatch) => {
    dispatch(requestRecipes());
    const Recipes = await getRecipes(url);
    return dispatch(receiveRecipes(Recipes));
  };
}

export const recipesDrinks = (drinksValue) => ({
  type: 'DRINKS',
  drinks: drinksValue,
});

export const recipesMeals = (mealsValue) => ({
  type: 'MEALS',
  meals: mealsValue,
});
