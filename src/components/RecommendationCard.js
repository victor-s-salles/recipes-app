import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../styles/RecommendationCard.css';

function RecommendationCard() {
  const recommendation = useSelector((state) => state.recipes.allRecipes);
  const [data, setData] = useState([]);
  const type = Object.keys(recommendation).toString();

  useEffect(() => {
    const key = 6;
    if (type) {
      if (type === 'drinks') {
        const drinkData = recommendation.drinks;
        const recommendationData = drinkData.slice(0, key);
        setData(recommendationData);
      } else {
        const mealsData = recommendation.meals;
        const recommendationData = mealsData.slice(0, key);
        setData(recommendationData);
      }
    }
  }, []);

  return (
    <>
      <h1>Recomendações</h1>
      <div className="container-recommendation">
        <div className="container-wrapper">
          {type === 'drinks' ? (
            <section className="gallery">
              {data.map((element, i) => (
                <Link
                  data-testid={ `${i}-recommendation-card` }
                  key={ element.idDrink }
                  to={ `/drinks/${element.idDrink}` }
                  onClick={ () => window.location.replace(`/drinks/${element.idDrink}`) }
                >
                  <img src={ element.strDrinkThumb } alt={ element.strCategory } />
                  <p data-testid={ `${i}-recommendation-title` }>{element.strDrink}</p>
                </Link>
              ))}
            </section>
          ) : (
            <section className="gallery">
              {data.map((element, i) => (
                <Link
                  data-testid={ `${i}-recommendation-card` }
                  key={ element.idMeal }
                  to={ `/meals/${element.idMeal}` }
                  onClick={ () => window.location.replace(`/meals/${element.idMeal}`) }
                >
                  <img src={ element.strMealThumb } alt={ element.strCategory } />
                  <p data-testid={ `${i}-recommendation-title` }>{element.strMeal}</p>
                </Link>
              ))}
            </section>)}
        </div>
      </div>
    </>
  );
}

export default RecommendationCard;
