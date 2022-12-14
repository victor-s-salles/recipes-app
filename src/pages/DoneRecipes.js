import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ShareButtonFavorites from '../components/ShareButtonFavorites';

function DoneRecipes() {
  const [recipeType, setRecipeType] = useState('all');
  const [actualRecipe, setActualRecipe] = useState('');
  const [localEmpty, setLocalEmpty] = useState(true);

  const isEmpty = () => {
    const recipes = localStorage.getItem('doneRecipes');
    if (recipes) {
      setLocalEmpty(false);
    }
  };

  useEffect(() => {
    isEmpty();
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    switch (recipeType) {
    case 'all':
      setActualRecipe(doneRecipes);
      break;
    case 'drink':
      setActualRecipe(doneRecipes.filter((recipe) => recipe.type === 'drink'));
      break;
    case 'meal':
      setActualRecipe(doneRecipes.filter((recipe) => recipe.type === 'meal'));
      break;
    default:
      break;
    }
  }, [recipeType]);

  return (
    <div>
      <Header pageName="Done Recipes" searchingOFF />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setRecipeType('all') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ () => setRecipeType('meal') }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ () => setRecipeType('drink') }
      >
        Drinks
      </button>
      {actualRecipe ? actualRecipe.map((recipe, index) => (
        <div key={ index }>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <img
              width="200px"
              src={ recipe.image }
              alt={ `${recipe.name} imagem` }
              data-testid={ `${index}-horizontal-image` }
            />
            <h2
              data-testid={ `${index}-horizontal-name` }
            >
              {recipe.name}
            </h2>
          </Link>
          {recipe.type === 'meal' ? (
            <h3
              data-testid={ `${index}-horizontal-top-text` }
            >
              {`${recipe.nationality} - ${recipe.category}`}
            </h3>)
            : (
              <h3
                data-testid={ `${index}-horizontal-top-text` }
              >
                {recipe.alcoholicOrNot}
              </h3>
            )}
          <h2
            data-testid={ `${index}-horizontal-done-date` }
          >
            {recipe.doneDate}
          </h2>
          {recipe.type === 'meal' ? (
            <div>
              <h2 data-testid={ `${index}-${recipe.tags[0]}-horizontal-tag` }>
                {recipe.tags[0]}
              </h2>
              <h2 data-testid={ `${index}-${recipe.tags[1]}-horizontal-tag` }>
                {recipe.tags[1]}
              </h2>
            </div>)
            : null }
          <ShareButtonFavorites
            type={ `${recipe.type}s` }
            id={ recipe.id }
            index={ index }
          />
        </div>
      )) : null}
    </div>
  );
}
export default DoneRecipes;
