import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { receiveRecipeforId, receiveRecipes } from '../redux/actions';
import getRecipes from '../services/getRecipes';
import getRecipeForId from '../services/getRecipeForId';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';
import RecommendationCard from './RecommendationCard';
import '../styles/RecipesDetails.css';

function RecipeDetails({ match: { params: { id } }, location: { pathname } }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [ingredients, setingredients] = useState();
  const [completeRecipe, setCompleteRecipe] = useState(false);
  const [progressRecipes, setProgressRecipe] = useState(false);
  const [recipe, setRecipe] = useState();
  const [type, setType] = useState();
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const startedRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

  useEffect(() => {
    const getRequest = async () => {
      if (pathname.includes('drinks')) {
        const urlId = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
        const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        const recipeId = await getRecipeForId(urlId, id);
        const recommendationRecipes = await getRecipes(url);
        setRecipe(recipeId);
        dispatch(receiveRecipeforId(recipeId));
        dispatch(receiveRecipes(recommendationRecipes));
      } else {
        const urlId = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
        const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
        const recipeId = await getRecipeForId(urlId, id);
        const recommendationRecipes = await getRecipes(url);
        setRecipe(recipeId);
        dispatch(receiveRecipeforId(recipeId));
        dispatch(receiveRecipes(recommendationRecipes));
      }
    };
    getRequest();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (recipe) {
      const keyproduct = Object.keys(recipe).toString();
      const keys = Object.keys(recipe[keyproduct][0]);
      const allIngredients = [];
      keys.forEach((element) => {
        if (element.includes('strIngredient') && recipe[keyproduct][0][element]) {
          allIngredients.push(element);
        }
        setingredients(allIngredients);
        setType(keyproduct);
      });
    }
  }, [recipe]);

  useEffect(() => {
    if (doneRecipes) {
      doneRecipes.forEach((item) => {
        if (item.id === id) {
          setCompleteRecipe(true);
        }
      });
    }
  }, [doneRecipes]);

  useEffect(() => {
    if (startedRecipes && type) {
      const idStartedRecipes = Object.keys(startedRecipes[type]);
      idStartedRecipes.forEach((item) => {
        if (item === id) {
          setProgressRecipe(true);
        }
      });
    }
  }, [startedRecipes, type]);

  const setAllIngredients = () => {
    const listIngredient = ingredients.map((element, index) => (
      <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
        {recipe[type][0][element]}
        {' '}
        {recipe[type][0][`strMeasure${index + 1}`]}
      </p>
    ));
    return listIngredient;
  };

  const startRecipe = () => {
    history.push(`${pathname}/in-progress`);
  };

  if (loading) { return <h1>Carregando...</h1>; }
  return (
    <div>

      {ingredients ? (
        <>
          <div className="RecipeD-btnsPdiv">
            <button
              type="button"
              onClick={ () => {
                if (pathname.includes('drinks')) {
                  history.push('/drinks');
                } else {
                  history.push('/meals');
                }
              } }
            >
              Voltar
            </button>
            <div className="RecipesD-Fav-Share-BTN">
              <FavoriteButton />
              <ShareButton />
            </div>
          </div>
          {!pathname.includes('drinks') ? (
            <section>
              <img
                src={ recipe[type][0].strMealThumb }
                alt={ recipe[type][0].strMeal }
                data-testid="recipe-photo"
                className="RecipeD-image"
              />
              <h3 data-testid="recipe-title">{recipe[type][0].strMeal}</h3>
              <p data-testid="recipe-category">{recipe[type][0].strCategory}</p>
              {setAllIngredients()}
              <p data-testid="instructions">{recipe[type][0].strInstructions}</p>
              <iframe
                data-testid="video"
                width="560"
                height="315"
                src={ recipe[type][0].strYoutube.replace('watch?v=', 'embed/') }
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer;
                clipboard-write;
                encrypted-media;
                gyroscope;
                picture-in-picture"
                allowFullScreen
              />
            </section>
          ) : (
            <section className="RecipeD-DivSec">
              <img
                src={ recipe[type][0].strDrinkThumb }
                alt={ recipe[type][0].strDrink }
                data-testid="recipe-photo"
                className="RecipeD-image"
              />
              <h3 data-testid="recipe-title">{recipe[type][0].strDrink}</h3>
              <p data-testid="recipe-category">{recipe[type][0].strAlcoholic}</p>
              {setAllIngredients()}
              <p data-testid="instructions">{recipe[type][0].strInstructions}</p>
            </section>
          )}
          <section>
            <RecommendationCard />
          </section>
        </>
      ) : null}
      {!completeRecipe ? (
        <button
          type="button"
          data-testid="start-recipe-btn"
          onClick={ startRecipe }
          style={ {
            position: 'fixed',
            bottom: 0,
          } }
        >
          Start Recipe
        </button>) : null}
      {progressRecipes ? (
        <button
          type="button"
          data-testid="start-recipe-btn"
          onClick={ startRecipe }
          style={ {
            position: 'fixed',
            bottom: 0,
          } }
        >
          Continue Recipe
        </button>) : null}
    </div>
  );
}

RecipeDetails.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  history: PropTypes.object,
}.isRequired;

export default RecipeDetails;
