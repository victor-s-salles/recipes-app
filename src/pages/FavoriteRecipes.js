import React from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  // const receitas = [
  //   {
  //     id: '1234',
  //     type: 'meal',
  //     nationality: 'Italian',
  //     category: 'Vegetarian',
  //     alcoholicOrNot: '',
  //     name: 'Spicy Arrabiata Penne',
  //     image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  //   },
  //   {
  //     id: '1000',
  //     type: 'drink',
  //     nationality: 'brasil',
  //     category: 'cate',
  //     alcoholicOrNot: 'Yes',
  //     name: 'frango',
  //     image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  //   },
  // ];
  return (
    <div>
      <Header pageName="Favorite Recipes" searchingOFF />
      <h1>Lista de receitas favoritas</h1>
      <button type="button" data-testid="filter-by-all-btn">
        All
      </button>
      <button type="button" data-testid="filter-by-meal-btn">
        Meals
      </button>
      <button type="button" data-testid="filter-by-drink-btn">
        Drinks
      </button>

      {receitas.map((e, index) => (
        <div key={ e.id }>
          <img
            src={ e.image }
            alt={ e.name }
            data-testid={ `${index}-horizontal-image` }
          />
          <p data-testid={ `${index}-horizontal-top-text` }>{e.category}</p>
          <p data-testid={ `${index}-horizontal-name` }>{e.name}</p>
          {e.type === 'meal' && (
            <p data-testid={ `${index}-horizontal-top-text` }>
              {`${e.nationality} - ${e.category}`}
            </p>
          )}
          <p data-testid={ `${index}-horizontal-done-date` }>
            DATA QUE A RECEITA FOI FEITA
          </p>
          {e.type === 'drink' && (
            <p data-testid={ `${index}-horizontal-top-text` }>{e.alcoholicOrNot}</p>
          )}
          <button
            src={ shareIcon }
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
          >
            <img src={ shareIcon } alt="Share button" />
          </button>
          <p data-testid={ `${index}-${e.type}-horizontal-tag` }>{e.type}</p>
          <button
            src={ blackHeartIcon }
            type="button"
            data-testid={ `${index}-horizontal-favorite-btn` }
          >
            <img src={ blackHeartIcon } alt="Favorite button" />
          </button>
        </div>
      ))}
    </div>
  );
}
export default FavoriteRecipes;
