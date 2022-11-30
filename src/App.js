import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Recipes from './Components/Recipes';
import RecipeDetails from './components/RecipeDetails';
import Profile from './pages/Profile';
import Recipes from './components/Recipes';
import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Recipes } />
      <Route exact path="/drinks" component={ Recipes } />
      <Route exact path="/meals/:id" component={ RecipeDetails } />
      <Route exact path="/drinks/:id" component={ RecipeDetails } />
      <Route path="/profile" component={ Profile } />
    </Switch>
  );
}

export default App;
