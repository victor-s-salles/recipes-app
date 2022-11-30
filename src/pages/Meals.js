import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { recipesMeals } from '../redux/actions';

class Meals extends React.Component {
  state = {
    comidas: [],
    categoriesMeals: [],
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    const doze = 12;
    const cinco = 5;

    const responseMeals = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const mealsData = await responseMeals.json();
    const dozeMeals = mealsData.meals.slice(0, doze);
    console.log(dozeMeals);

    const responseCategories = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const mealsCategoriesData = await responseCategories.json();
    const cincoCategoriesMeals = mealsCategoriesData.meals.slice(0, cinco);
    console.log(cincoCategoriesMeals);

    dispatch(recipesMeals(cincoCategoriesMeals));
    this.setState({
      comidas: dozeMeals,
      categoriesMeals: cincoCategoriesMeals,
    });
  }

  mealsRender = () => {
    const { comidas, categoriesMeals } = this.state;

    return (
      <section>
        {categoriesMeals.map((ele, index2) => (
          <div key={ index2 }>
            <button
              type="button"
              data-testid={ `${ele.strCategory}-category-filter` }
            >
              { ele.strCategory }
            </button>
          </div>
        ))}
        {comidas.map((ele, index) => (
          <div key={ index } data-testid={ `${index}-recipe-card` }>
            <img
              src={ ele.strMealThumb }
              alt=""
              width="200px"
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{ele.strMeal}</p>
          </div>
        ))}
      </section>
    );
  };

  render() {
    return (
      <div>
        <h1>MEALS</h1>
        {this.mealsRender()}
      </div>
    );
  }
}

Meals.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  meals: state.meals,
});

export default connect(mapStateToProps)(Meals);
