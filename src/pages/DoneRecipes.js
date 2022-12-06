import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
// import shareIcon from '../images/shareIcon.svg';

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
    const doneRecipes = localStorage.getItem('doneRecipes');
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
      {!localEmpty ? (
        <div>
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
          {actualRecipe.map((recipe, index) => (
            <div key={ index }>
              <Link to={ `/drinks/${recipe.id}` }>
                <img
                  src={ recipe.image }
                  alt={ `${recipe.name} imagem` }
                  data-testid={ `${index}-horizontal-img` }
                />
                <h2
                  data-testid={ `${index}-horizontal-name` }
                >
                  {recipe.name}
                </h2>
              </Link>
              {recipe.type === meal ? (
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
                <h2 data-testid={ `${index}-${recipe.tag}-horizontal-tag` }>
                  {recipe.tag[0]}
                  {recipe.tag[1]}
                </h2>)
                : null }

            </div>

          ))}

        </div>)
        : <h1>Nenhuma receita foi finalizada </h1> }

    </div>
  );
}
export default DoneRecipes;

/* <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
          >
            <img
            src={shareIcon}
            alt='botão compartilhar'>

          </button> */
