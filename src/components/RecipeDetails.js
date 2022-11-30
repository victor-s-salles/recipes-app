import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchRecipeId } from '../redux/actions';

function RecipeDetails({ match: { params: { id } }, location: { pathname } }) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (pathname.includes('drink')) {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
      const getRecipe = async () => {
        dispatch(fetchRecipeId(url, id));
      };
      getRecipe();
    } else {
      const url = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
      const getRecipe = async () => {
        dispatch(fetchRecipeId(url, id));
      };
      getRecipe();
    }
  }, []);
  console.log(pathname);
  return (

    <h1>recipedetatils</h1>

  );
}

RecipeDetails.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default RecipeDetails;
