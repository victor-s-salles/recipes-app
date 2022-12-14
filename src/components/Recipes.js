import React from 'react';
import { useLocation } from 'react-router-dom';
import Meals from '../pages/Meals';
import Drinks from '../pages/Drinks';
import Footer from './Footer';

function Recipes() {
  const history = useLocation();
  return (
    <div>
      <h1>RECIPES</h1>
      {history.pathname === '/meals' ? (<Meals history={ history } />) : null}
      {history.pathname === '/drinks' ? (<Drinks history={ history } />) : null}
      <Footer />
    </div>
  );
}

export default Recipes;
