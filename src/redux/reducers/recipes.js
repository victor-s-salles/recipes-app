import { RECEIVE_RECIPES, RECEIVE_RECIPE_FOR_ID, REQUEST_RECIPES } from "../actions";

const INITIAL_STATE = {
  IsFething: false,
  recipesForId: {},
  AllRecipes: [],
};

const recipes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REQUEST_RECIPES: {
    return{
      ...state,
      IsFething: true,
    };
  }
  case RECEIVE_RECIPE_FOR_ID: {
    return{
      ...state,
      IsFething: false,
      recipesForId : action.payload,
    };
  }
  case RECEIVE_RECIPES: {
    return{
      ...state,
      IsFething: false,
      AllRecipes : action.payload,
    };
  }
  default:
    return state;
  }
};

export default recipes;
