import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchRecipeId } from '../redux/actions';

function RecipeDetails({ match: { params: { id } } }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const getRecipe = async () => {
      dispatch(fetchRecipeId(id));
    };
    getRecipe();
  }, []);
  return (

    <h1>recipedetatils</h1>

  );
}

export default RecipeDetails;
