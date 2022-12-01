import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipeId } from '../redux/actions';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';

function RecipeDetails({ match: { params: { id } }, location: { pathname } }) {
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipes.recipesForId);
  const loading = useSelector((state) => state.recipes.IsLoading);
  const [ingredients, setingredients] = useState([]);
  const [data, setData] = useState({});
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

  useEffect(() => {
    if (!loading) {
      if (pathname.includes('drink')) {
        const drinkData = recipe.drinks[0];
        setData(drinkData);
      } else if (pathname.includes('meals')) {
        const mealsData = recipe.meals[0];
        setData(mealsData);
      }
    }
  }, [recipe]);

  useEffect(() => {
    const keys = Object.keys(data);
    const allIngredients = [];
    keys.forEach((element) => {
      if (element.includes('strIngredient') && data[element]) {
        allIngredients.push(element);
      }
      setingredients(allIngredients);
    });
    console.log(keys);
    console.log(allIngredients);
  }, [data]);

  if (loading) { return <h1>Carregando...</h1>; }

  return (
    <div>
      <FavoriteButton />
      <ShareButton />
      {!pathname.includes('drink') ? (
        <section>
          <img
            src={ recipe.meals[0].strMealThumb }
            alt={ recipe.meals[0].strMeal }
            data-testid="recipe-photo"
          />
          <h3 data-testid="recipe-title">{recipe.meals[0].strMeal}</h3>
          <p data-testid="recipe-category">{recipe.meals[0].strCategory}</p>
          {ingredients.map((element, index) => (
            <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              {recipe.meals[0][element]}
              {' '}
              {recipe.meals[0][`strMeasure${index + 1}`]}
            </p>
          ))}
          <p data-testid="instructions">{recipe.meals[0].strInstructions}</p>
          <iframe
            data-testid="video"
            width="560"
            height="315"
            src={ recipe.meals[0].strYoutube }
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer;
            autoplay;
            clipboard-write;
            encrypted-media;
            gyroscope;
            picture-in-picture"
            allowFullScreen
          />
        </section>
      ) : (
        <section>
          <img
            src={ recipe.drinks[0].strDrinkThumb }
            alt={ recipe.drinks[0].strDrink }
            data-testid="recipe-photo"
          />
          <h3 data-testid="recipe-title">{recipe.drinks[0].strDrink}</h3>
          <p data-testid="recipe-category">{recipe.drinks[0].strAlcoholic}</p>
          {ingredients.map((element, index) => (
            <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              {recipe.drinks[0][element]}
              {' '}
              {recipe.drinks[0][`strMeasure${index + 1}`]}
            </p>
          ))}
          <p data-testid="instructions">{recipe.drinks[0].strInstructions}</p>
        </section>
      )}
    </div>
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
