import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import Meals from '../pages/Meals';
import Drinks from '../pages/Drinks';
import Footer from './Footer';

function Recipes() {
  const history = useLocation();
  return (
    <div>
      <h1>RECIPES </h1>
      {history.pathname === '/meals' ? (<Meals />) : null}
      {history.pathname === '/drinks' ? (<Drinks />) : null}
      <Footer />
    </div>
  );
}

Recipes.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

// const mapStateToProps = (state) => ({
//   drinks: state.drinks,
//   meals: state.meals,
// });

export default Recipes;
