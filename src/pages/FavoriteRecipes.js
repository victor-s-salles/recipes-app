import React from 'react';
import Header from '../components/Header';

function FavoriteRecipes() {
  const receitas = [{
    id: '1234',
    type: 'meal',
    nationality: 'Brasil',
    category: 'categoria',
    alcoholicOrNot: 'alcoólica',
    name: 'carne',
    image: 'foto',
  }, {
    id: '1000',
    type: 'meal',
    nationality: 'Brasil',
    category: 'categoria',
    alcoholicOrNot: '',
    name: 'frango',
    image: 'foto2',
  }];
  return (
    <div>
      <Header pageName="Favorite Recipes" searchingOFF />
      <h1>Lista de receitas favoritas</h1>
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All

      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
      >
        Meals

      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks

      </button>

      {receitas.map((e, index) => (
        <div key={ e.id }>
          <img
            src={ e.image }
            alt={ e.name }
            data-testid={ `${index}-horizontal-image` }
          />
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            {e.category}

          </p>
          <p
            data-testid={ `${index}-horizontal-name` }
          >
            {e.name}

          </p>
          <p
            data-testid={ `${index}-horizontal-done-date` }
          >
            DATA QUE A RECEITA FOI FEITA

          </p>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
          >
            COMPARTILHAR

          </button>
          <p
            data-testid={ `${index}-${e.type}-horizontal-tag` }
          >
            {e.type}

          </p>
          <button
            type="button"
            data-testid={ `${index}-horizontal-favorite-btn` }
          >
            FAVORITAR
          </button>

        </div>
      )) }
    </div>
  );
}
export default FavoriteRecipes;
