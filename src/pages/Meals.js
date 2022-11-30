import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { recipesMeals } from '../redux/actions';
import Header from '../components/Header';

class Meals extends React.Component {
  state = {
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

    dispatch(recipesMeals(dozeMeals));

    this.setState({
      categoriesMeals: cincoCategoriesMeals,
    });
  }

  mealsRender = () => {
    const { categoriesMeals } = this.state;
    const { meals } = this.props;
    if (!meals) {
      return (<h1>Loading</h1>);
    }
    return (
      <section>
        <Header pageName="Meals" />
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
          <Link to={ `/meals/${ele.idMeal}` } key={ index }>
            <div data-testid={ `${index}-recipe-card` }>
              <img
                src={ ele.strMealThumb }
                alt=""
                width="200px"
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{ele.strMeal}</p>
            </div>
          </Link>
        ))}
      </section>
    );
  };

  render() {
    return (
      <div>
        {this.mealsRender()}
      </div>
    );
  }
}

Meals.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  meals: state.recipes.meals,
});

export default connect(mapStateToProps)(Meals);
