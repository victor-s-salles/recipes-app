import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchRecipeId } from '../redux/actions';

function RecipeDetails() {
  const dispatch = useDispatch();
  useEffect(() => {
    const recipe = async () => {
      await dispatch(fetchRecipeId());
    };
    recipe();
  }, []);
  return (
    <h1>recipedetatils</h1>
  );
}

export default RecipeDetails;
