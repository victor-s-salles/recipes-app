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
  payload: {
    recipeId,
  },
});

const receiveRecipes = (recipes) => ({
  type: RECEIVE_RECIPES,
  payload: recipes,
});

// const fetchRecipeId = async (dispatch) => {
//     try {
//       dispatch(requestRecipes());
//       const issLocation = await getCurrentIssLocation();
//       const { latitude, longitude } = issLocation.iss_position;

//       dispatch(receiveIssLocationSuccess(Number(latitude), Number(longitude)));
//     } catch (error) {
//       console.log(error);
//     }
//   };

export function fetchRecipeId(id) {
  return (dispatch) => {
    dispatch(requestRecipes());
    const recipeId = getRecipeForId(id);
    console.log(recipeId);
    return dispatch(receiveRecipeforId(recipeId));
  };
}

export function fetchAllRecipes(url) {
  return (dispatch) => {
    dispatch(requestRecipes());
    const Recipes = getRecipes(url);
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
