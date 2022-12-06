import React from 'react';
import { useSelector } from 'react-redux';

function RecipeInProgress() {
  const drinksID = useSelector((state) => state.recipes.recipesForId.drinks);
  const mealsID = useSelector((state) => state.recipes.recipesForId.meals);

  const handleChecked = ({ target }) => {
    if (target.checked) {
      target.parentNode.style.textDecorationLine = 'line-through';
      target.parentNode.style.textDecorationStyle = 'solid';
      target.parentNode.style.textDecorationColor = 'rgb(0, 0, 0)';
    } else { target.parentNode.style.textDecorationLine = 'none'; }
  };

  return (
    <div>
      <h1>Recipe In Progress</h1>
      {drinksID ? (
        <div>
          <p>DRINKS</p>
          <img
            data-testid="recipe-photo"
            src={ drinksID[0].strDrinkThumb }
            alt={ drinksID[0].strDrink }
          />
          <p data-testid="recipe-title">{ drinksID[0].strDrink }</p>
          <button
            onClick={ handleChecked }
            data-testid="share-btn"
            type="button"
          >
            BUTTON
            {/* BOTAO DE COMPARTILHAR */}
          </button>
          <button
            data-testid="favorite-btn"
            type="button"
          >
            BUTTON
            {/* BOTAO DE FAVORITAR */}
          </button>
          <p data-testid="recipe-category">{ drinksID[0].strCategory }</p>
          <p data-testid="instructions">{ drinksID[0].strInstructions }</p>
          <button
            data-testid="finish-recipe-btn"
            type="button"
          >
            BUTTON
            {/* BOTAO DE FINALIZAR */}
          </button>
          <p>Ingredients</p>
          {Object.entries(drinksID[0]).filter((ele) => ele[0]
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
          <p>MEALS</p>
          <img data-testid="recipe-photo" src={ mealsID[0].strMealThumb } alt="" />
          <p data-testid="recipe-title">{ mealsID[0].strArea }</p>
          <button
            data-testid="share-btn"
            type="button"
          >
            BUTTON
            {/* BOTAO DE COMPARTILHAR */}
          </button>
          <button
            data-testid="favorite-btn"
            type="button"
          >
            BUTTON
            {/* BOTAO DE FAVORITAR */}
          </button>
          <p data-testid="recipe-category">{ mealsID[0].strCategory }</p>
          <p data-testid="instructions">{ mealsID[0].strInstructions }</p>
          <button
            data-testid="finish-recipe-btn"
            type="button"
          >
            BUTTON
            {/* BOTAO DE FINALIZAR */}
          </button>
          <p>Ingredients</p>
          {Object.entries(mealsID[0]).filter((ele) => ele[0]
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
