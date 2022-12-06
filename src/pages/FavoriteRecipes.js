import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';

import ShareButtonFavorites from '../components/ShareButtonFavorites';

function FavoriteRecipes() {
  // const receitas = [
  //   {
  //     id: '52977',
  //     type: 'meals',
  //     nationality: 'Italian',
  //     category: 'Vegetarian',
  //     alcoholicOrNot: '',
  //     name: 'Spicy Arrabiata Penne',
  //     image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  //   },
  //   {
  //     id: '1000',
  //     type: 'drinks',
  //     nationality: 'brasil',
  //     category: 'cate',
  //     alcoholicOrNot: 'Alcoholic',
  //     name: 'Aquamarine',
  //     image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  //   },
  // ];
  // localStorage.setItem('favoriteRecipes', JSON.stringify(receitas));

  // EMULAÇÃO DO LOCAL STORAGE

  const [favoritesList, setFavoritesList] = useState([]);
  const [backupFavoritesList, setBackupFavoritesList] = useState([]);
  useEffect(() => {
    const favoritesLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoritesList(favoritesLocalStorage);
    setBackupFavoritesList(favoritesLocalStorage);
  }, []);

  const removeFavorite = (id) => {
    console.log('REMOVEU', id);
    const idsList = favoritesList.map((e) => (e.id));
    const indexToRemove = idsList.indexOf(id);
    const newFavoritesList = [...favoritesList];
    newFavoritesList.splice(indexToRemove, 1);
    setFavoritesList(newFavoritesList);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoritesList));
    // Salvar no local storage-------
  };

  const filterMeals = () => {
    const filtredArray = backupFavoritesList.filter((e) => e.type === 'meal');
    setFavoritesList(filtredArray);
  };
  const filterDrinks = () => {
    const filtredArray = backupFavoritesList.filter((e) => e.type === 'drink');
    setFavoritesList(filtredArray);
  };
  const filterAll = () => {
    setFavoritesList(backupFavoritesList);
  };
  return (
    <div>
      <Header pageName="Favorite Recipes" searchingOFF />
      <h1>Lista de receitas favoritas</h1>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ filterAll }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ filterMeals }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ filterDrinks }
      >
        Drinks
      </button>

      {favoritesList.map((e, index) => (
        <div key={ e.id }>
          <Link to={ e.type === 'drink' ? `/drinks/${e.id}` : `/meals/${e.id}` }>
            <img
              src={ e.image }
              alt={ e.name }
              data-testid={ `${index}-horizontal-image` }
              width="200px"
            />
          </Link>
          <Link to={ e.type === 'drink' ? `/drinks/${e.id}` : `/meals/${e.id}` }>
            <p data-testid={ `${index}-horizontal-name` }>{e.name}</p>
          </Link>
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
          <ShareButtonFavorites
            index={ index }
            id={ e.id }
            type={ e.type === 'drink' ? 'drinks' : 'meals' }
          />

          <p data-testid={ `${index}-${e.type}-horizontal-tag` }>{e.type}</p>
          <button
            src={ blackHeartIcon }
            type="button"
            data-testid={ `${index}-horizontal-favorite-btn` }
            onClick={ () => { removeFavorite(e.id); } }
          >
            <img src={ blackHeartIcon } alt="Favorite button" />
          </button>
        </div>
      ))}
    </div>
  );
}
export default FavoriteRecipes;
