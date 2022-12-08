import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import FavoriteButton from './FavoriteButton';
import ShareButton from './ShareButton';
import { receiveRecipeforId } from '../redux/actions/index';
import CheckBox from './CheckBox';

function RecipeInProgress() {
  const location = useLocation();
  const { id } = useParams();
  const [drinksID, setDataDrinks] = useState();
  const [mealsID, setDataMeals] = useState();
  const [finishBTN, setFinishBTN] = useState(true);
  const [numberCheckbox, setNumberCheckbox] = useState(0);
  const dispatch = useDispatch();
  const [listOfIngredients, setListOfIngredients] = useState([]);
  const x = location.pathname;
  const recipeID = x.split('/');
  const recipeNewID = recipeID[2];

  const saveLocalStorage = (newArray) => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
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

    setNumberCheckbox(target.parentNode.parentNode.parentNode.childElementCount);
    // const numberCheckbox = target.parentNode.parentNode.parentNode.childElementCount;
    // if (listOfIngredients.length === numberCheckbox) {
    //   setFinishBTN(false);
    // }

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
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((fetchComida) => {
          setDataMeals(fetchComida.meals[0]);
          dispatch(receiveRecipeforId(fetchComida));

          setNumberCheckbox(Object.entries(fetchComida.meals[0]).filter((ele) => ele[0]
            .includes('strIngredient') && ele[1]).map((ele) => ele[1]).length);

          if (inProgressRecipes.meals[recipeNewID]) {
            setListOfIngredients(inProgressRecipes.meals[recipeNewID]);
          }
        });

      saveMeals();
    } else {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)

        .then((response) => response.json())
        .then((fetchBebida) => {
          setDataDrinks(fetchBebida.drinks[0]);
          dispatch(receiveRecipeforId(fetchBebida));
          setNumberCheckbox(Object.entries(fetchBebida.drinks[0]).filter((ele) => ele[0]
            .includes('strIngredient') && ele[1]).map((ele) => ele[1]).length);
        });

      if (inProgressRecipes.drinks[recipeNewID]) {
        setListOfIngredients(inProgressRecipes.drinks[recipeNewID]);
      }
      saveDrinks();
    }
  }, []);

  console.log(numberCheckbox);
  console.log(listOfIngredients.length);

  useEffect(() => {
    if (listOfIngredients.length === numberCheckbox) {
      setFinishBTN(false);
    } else { setFinishBTN(true); }
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
            disabled={ finishBTN }
          >
            Finish Recipe
            {/* BOTAO DE FINALIZAR */}
          </button>
          <p>Ingredients</p>
          <div id="checkboxes">
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
            alt={ mealsID.strMeal }
          />
          <p data-testid="recipe-title">{ mealsID.strArea }</p>
          <p data-testid="recipe-category">{ mealsID.strCategory }</p>
          <p data-testid="instructions">{ mealsID.strInstructions }</p>
          <button
            data-testid="finish-recipe-btn"
            type="button"
            disabled={ finishBTN }
          >
            Finish Recipe
            {/* BOTAO DE FINALIZAR */}
          </button>
          <p>Ingredients</p>
          <div>
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
        </div>
      ) : null}
    </div>
  );
}

export default RecipeInProgress;
