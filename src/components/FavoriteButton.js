import React from 'react';
import { useSelector } from 'react-redux';

function FavoriteButton() {
  const actualRecipe = useSelector((state) => state.recipes.recipesForId);

  const formateRecipeData = () => {
    if (actualRecipe.meals) {
      const recipeData = {
        id: actualRecipe.meals[0].idMeal,
        type: 'meal',
        nationality: actualRecipe.meals[0].strArea,
        category: actualRecipe.meals[0].strCategory,
        alcoholicOrNot: (actualRecipe.meals[0]
          .strDrinkAlternate ? actualRecipe.meals[0].strDrinkAlternate : ''),
        name: actualRecipe.meals[0].strMeal,
        image: actualRecipe.meals[0].strMealThumb,
      };
      return recipeData;
    }
    const recipeData = {
      id: actualRecipe.drinks[0].idDrink,
      type: 'drink',
      nationality: (actualRecipe.drinks[0].strArea ? actualRecipe.drinks[0].strArea : ''),
      category: actualRecipe.drinks[0].strCategory,
      alcoholicOrNot: actualRecipe.drinks[0].strAlcoholic,
      name: actualRecipe.drinks[0].strDrink,
      image: actualRecipe.drinks[0].strDrinkThumb,
    };
    return recipeData;
  };

  const addRecipeInLocalStorage = (recipe) => {
    if (!localStorage.getItem('favoriteRecipes')) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    favoriteRecipes.push(recipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  };

  const onFavoriteButtonClick = () => {
    const recipeData = formateRecipeData();
    addRecipeInLocalStorage(recipeData);
  };

  return (
    <button
      type="button"
      data-testid="favorite-btn"
      onClick={ onFavoriteButtonClick }
    >
      Favorite
    </button>
  );
}

export default FavoriteButton;
