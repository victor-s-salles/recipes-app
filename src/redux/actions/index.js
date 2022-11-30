import getRecipes from '../../services/getRecipes';
import getRecipeForId from '../../services/getRecipeForId';

export const REQUEST_RECIPES = 'REQUEST_RECIPES';
export const RECEIVE_RECIPE_FOR_ID = 'RECEIVE_RECIPE_FOR_ID';
export const RECEIVE_RECIPES = 'RECEIVE_RECIPES';

const requestRecipes = () => ({
  type: REQUEST_RECIPES,
});

const receiveRecipeforId = (RecipeId) => ({
  type: RECEIVE_RECIPE_FOR_ID,
  payload: RecipeId,
});

const receiveRecipes = (Recipes) => ({
  type: RECEIVE_RECIPES,
  payload: Recipes,
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

export function fetchRecipeId(url, id) {
  return (dispatch) => {
    dispatch(requestRecipes());
    const RecipeId = getRecipeForId(url, id);
    return dispatch(receiveRecipeforId(RecipeId));
  };
}

export function fetchAllRecipes(url) {
  return (dispatch) => {
    dispatch(requestRecipes());
    const Recipes = getRecipes(url);
    return dispatch(receiveRecipes(Recipes));
  };
}
