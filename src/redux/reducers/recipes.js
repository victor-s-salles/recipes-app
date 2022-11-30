import { DRINKS, MEALS } from '../actions/index';

const INITIAL_STATE = {
  drinks: [],
  meals: [],
};

const recipes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
