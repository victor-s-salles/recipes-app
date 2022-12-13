import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
// import shareIcon from '../images/shareIcon.svg';
import ShareButton from '../components/ShareButton';

function DoneRecipes() {
  const [recipeType, setRecipeType] = useState('all');
  const [actualRecipe, setActualRecipe] = useState('');

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    switch (recipeType) {
    case 'all':
      setActualRecipe(doneRecipes);
      break;
    case 'drink':
      setActualRecipe(doneRecipes.filter((recipe) => recipe.type === 'drinks'));
      break;
    case 'meal':
      setActualRecipe(doneRecipes.filter((recipe) => recipe.type === 'meals'));
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
          <Link to={ `/drinks/${recipe.id}` }>
            <img
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
          {recipe.type === 'meals' ? (
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
          {recipe.type === 'meals' ? (
            <h2 data-testid={ `${index}-${recipe.tag[0]}-horizontal-tag` }>
              {recipe.tag[0]}
              {recipe.tag[1]}
            </h2>)
            : null }
          <ShareButton />
        </div>

      )) : null}
    </div>
  );
}
export default DoneRecipes;
