import { combineReducers } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import recipes from './recipes';
import user from './user';

const rootReducer = combineReducers({ user, recipes }, composeWithDevTools(applyMiddleware(thunk)));

export default rootReducer;
