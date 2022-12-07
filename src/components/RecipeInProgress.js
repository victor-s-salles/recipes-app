import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';
import { receiveRecipeforId } from '../redux/actions/index';

function RecipeInProgress() {
  const [drinksID, setDataDrinks] = useState();
  const [mealsID, setDataMeals] = useState();
  const dispatch = useDispatch();
  console.log(drinksID);

  const handleChecked = ({ target }) => {
    if (target.checked) {
      target.parentNode.style.textDecorationLine = 'line-through';
      target.parentNode.style.textDecorationStyle = 'solid';
      target.parentNode.style.textDecorationColor = 'rgb(0, 0, 0)';
    } else { target.parentNode.style.textDecorationLine = 'none'; }
  };

  useEffect(() => {
    const x = window.location.pathname;
    const sete = 7; const doze = 12;
    if (x.includes('meals')) {
      const recipeID = x.slice(sete, doze);
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeID}`)
        .then((response) => response.json())
        .then((fetchComida) => {
          setDataMeals(fetchComida.meals[0]);
          dispatch(receiveRecipeforId(fetchComida));
        });
    } else {
      const recipeID = x.slice(8, 13);
      console.log(recipeID);
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeID}`)
        .then((response) => response.json())
        .then((fetchBebida) => {
          setDataDrinks(fetchBebida.drinks[0]);
          dispatch(receiveRecipeforId(fetchBebida));
        });
    }
  }, []);

  if (drinksID) { console.log(true); }
  return (
    <div>
      <h1>Recipe In Progress</h1>
      {drinksID ? (
        <div>
          <FavoriteButton />
          <ShareButton />
          <p>DRINKS</p>
          <img
            data-testid="recipe-photo"
            src={ drinksID.strDrinkThumb }
            alt={ drinksID.strDrink }
          />
          <p data-testid="recipe-title">{ drinksID.strDrink }</p>
          <p data-testid="recipe-category">{ drinksID.strCategory }</p>
          <p data-testid="instructions">{ drinksID.strInstructions }</p>
          <button
            data-testid="finish-recipe-btn"
            type="button"
          >
            BUTTON
            {/* BOTAO DE FINALIZAR */}
          </button>
          <p>Ingredients</p>
          {Object.entries(drinksID).filter((ele) => ele[0]
            .includes('strIngredient') && ele[1]).map((ele) => ele[1])
            .map((ele2Ingredient, indexDrinks) => (
              <div key={ indexDrinks }>
                <label
                  htmlFor={ ele2Ingredient }
                  data-testid={ `${indexDrinks}-ingredient-step` }
                >
                  {ele2Ingredient}
                  <input
                    type="checkbox"
                    id={ ele2Ingredient }
                    onClick={ handleChecked }
                  />
                </label>
              </div>
            ))}
        </div>
      ) : null}
      {mealsID ? (
        <div>
          <FavoriteButton />
          <ShareButton />
          <p>MEALS</p>
          <img
            data-testid="recipe-photo"
            src={ mealsID.strMealThumb }
            alt=""
          />
          <p data-testid="recipe-title">{ mealsID.strArea }</p>
          <p data-testid="recipe-category">{ mealsID.strCategory }</p>
          <p data-testid="instructions">{ mealsID.strInstructions }</p>
          <button
            data-testid="finish-recipe-btn"
            type="button"
          >
            BUTTON
            {/* BOTAO DE FINALIZAR */}
          </button>
          <p>Ingredients</p>
          {Object.entries(mealsID).filter((ele) => ele[0]
            .includes('strIngredient') && ele[1]).map((ele) => ele[1])
            .map((ele2Ingredient, indexMeals) => (
              <div key={ indexMeals }>
                <label
                  htmlFor={ ele2Ingredient }
                  data-testid={ `${indexMeals}-ingredient-step` }
                >
                  {ele2Ingredient}
                  <input
                    type="checkbox"
                    id={ ele2Ingredient }
                    onClick={ handleChecked }
                  />
                </label>
              </div>
            ))}
        </div>
      ) : null}
    </div>
  );
}

export default RecipeInProgress;
