import { RECEIVE_RECIPES,
  RECEIVE_RECIPE_FOR_ID,
  REQUEST_RECIPES,
  DRINKS,
  MEALS,
} from '../actions';

const INITIAL_STATE = {
  IsFething: false,
  recipesForId: {},
  allRecipes: [],
  drinks: [],
  meals: [],
};

const recipes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_RECIPES: {
    return {
      ...state,
      IsFething: true,
    };
  }
  case RECEIVE_RECIPE_FOR_ID: {
    return {
      ...state,
      IsFething: false,
      recipesForId: action.payload.recipeId,
    };
  }
  case RECEIVE_RECIPES: {
    return {
      ...state,
      IsFething: false,
      allRecipes: action.payload,
    };
  }
  case MEALS:
    return ({
      ...state,
      meals: action.meals,
    });
  case DRINKS:
    return ({
      ...state,
      drinks: action.drinks,
    });
  default:
    return state;
  }
};

export default recipes;
