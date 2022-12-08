import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';
import { receiveRecipeforId } from '../redux/actions/index';
import CheckBox from './CheckBox';

function RecipeInProgress() {
  const [drinksID, setDataDrinks] = useState();
  const [mealsID, setDataMeals] = useState();
  const dispatch = useDispatch();
  const [listOfIngredients, setListOfIngredients] = useState([]);
  const location = useLocation();
  const x = location.pathname;
  const recipeID = x.split('/');
  const recipeNewID = recipeID[2];

  const saveLocalStorage = (newArray) => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    // console.log(inProgressRecipes);
    if (x.includes('meals')) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({ ...inProgressRecipes,
        meals: { ...inProgressRecipes.meals, [recipeNewID]: newArray } }));
    } else {
      console.log(newArray);
      localStorage.setItem('inProgressRecipes', JSON.stringify({ ...inProgressRecipes,
        drinks: { ...inProgressRecipes.drinks, [recipeNewID]: newArray } }));
    }
  };

  const handleChecked = ({ target }) => {
    if (!listOfIngredients) {
      setListOfIngredients([]);
    }

    if (listOfIngredients) {
      const checked = listOfIngredients.some((e) => (e === target.name));
      if (!checked) {
        setListOfIngredients([...listOfIngredients, target.name]);
        const newArray = [...listOfIngredients, target.name];
        saveLocalStorage(newArray);
      } else {
        const index = listOfIngredients.indexOf(target.name);
        const newArray = [...listOfIngredients];
        newArray.splice(index, 1);
        setListOfIngredients(newArray);
        saveLocalStorage(newArray);
      }
    }

    // localStorage.setItem('inProgressRecipes', JSON.stringify({ ...inProgressRecipes,
    //   meals: listOfIngredients }));

    // if (target.checked) {
    //   target.parentNode.style.textDecorationLine = 'line-through';
    //   target.parentNode.style.textDecorationStyle = 'solid';
    //   target.parentNode.style.textDecorationColor = 'rgb(0, 0, 0)';
    // } else { target.parentNode.style.textDecorationLine = 'none'; }
  };

  const testADD = (ingredient) => {
    let checked = false;
    if (listOfIngredients) {
      checked = listOfIngredients.some((e) => (e === ingredient));
    }

    return checked;
  };

  const saveMeals = () => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!inProgressRecipes) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        drinks: { ...inProgressRecipes.drinks },
        meals: { [recipeNewID]: [] },
      }));
    } else if (!inProgressRecipes.meals[recipeNewID]) {
      console.log('teste');
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        drinks: { ...inProgressRecipes.drinks },
        meals: { ...inProgressRecipes.meals, [recipeNewID]: [] },
      }));
      setListOfIngredients([]);
    }
  };
  const saveDrinks = () => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!inProgressRecipes) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        drinks: { [recipeNewID]: [] },
        meals: { ...inProgressRecipes.meals },
      }));
    } else if (!inProgressRecipes.drinks[recipeNewID]) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        drinks: { ...inProgressRecipes.drinks, [recipeNewID]: [] },
        meals: { ...inProgressRecipes.meals },
      }));
      setListOfIngredients([]);
    }
  };

  useEffect(() => {
    const inProgressRecipes2 = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!inProgressRecipes2) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        drinks: { },
        meals: { },
      }));
    }
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (x.includes('meals')) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeID[2]}`)
        .then((response) => response.json())
        .then((fetchComida) => {
          setDataMeals(fetchComida.meals[0]);
          dispatch(receiveRecipeforId(fetchComida));

          if (inProgressRecipes.meals[recipeNewID]) {
            setListOfIngredients(inProgressRecipes.meals[recipeNewID]);
          }
        });
      /// ///
      saveMeals();
    } else if (x.includes('drinks')) {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeID[2]}`)
        .then((response) => response.json())
        .then((fetchBebida) => {
          setDataDrinks(fetchBebida.drinks[0]);
          dispatch(receiveRecipeforId(fetchBebida));
        });

      if (inProgressRecipes.drinks[recipeNewID]) {
        setListOfIngredients(inProgressRecipes.drinks[recipeNewID]);
      }
      saveDrinks();
    }
  }, []);

  useEffect(() => {
  }, [listOfIngredients]);

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

                <CheckBox
                  ingredient={ ele2Ingredient }
                  index={ indexDrinks }
                  id={ drinksID.idDrink }
                  type="drinks"
                  handleCheckedMain={ handleChecked }
                  listChecked={ listOfIngredients }
                  check={ testADD(ele2Ingredient) }

                />
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
                <CheckBox
                  ingredient={ ele2Ingredient }
                  index={ indexMeals }
                  id={ mealsID.idMeal }
                  type="meals"
                  handleCheckedMain={ handleChecked }
                  listChecked={ listOfIngredients }
                  check={ testADD(ele2Ingredient) }

                />
              </div>
            ))}
        </div>
      ) : null}
    </div>
  );
}

export default RecipeInProgress;
