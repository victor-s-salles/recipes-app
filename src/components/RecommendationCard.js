import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import '../styles/RecommendationCard.css';

function RecommendationCard() {
  const recommendation = useSelector((state) => state.recipes.allRecipes);
  const [data, setData] = useState([]);
  const [verify, setVerify] = useState(false);
  const type = Object.keys(recommendation).toString();

  const recommendationVerify = () => {
    if (recommendation) {
      setVerify(true);
    }
  };

  useEffect(() => {
    recommendationVerify();
    const key = 6;
    if (verify) {
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
  }, [recommendation]);

  return (
    <>
      <h1>Recomendações</h1>
      <div className="container-recommendation">
        <div className="container-wrapper">
          {type === 'drinks' ? (
            <section className="gallery">
              {data.map((element, i) => (
                <div
                  data-testid={ `${i}-recommendation-card` }
                  key={ element.idDrink }
                >
                  <img src={ element.strDrinkThumb } alt={ element.strCategory } />
                  <p data-testid={ `${i}-recommendation-title` }>{element.strDrink}</p>
                </div>
              ))}
            </section>
          ) : (
            <section className="gallery">
              {data.map((element, i) => (
                <div
                  data-testid={ `${i}-recommendation-card` }
                  key={ element.idMeal }

                >
                  <img src={ element.strMealThumb } alt={ element.strCategory } />
                  <p data-testid={ `${i}-recommendation-title` }>{element.strMeal}</p>
                </div>
              ))}
            </section>)}
        </div>
      </div>
    </>
  );
}

export default RecommendationCard;
