import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { recipesMeals } from '../redux/actions';
import Header from '../components/Header';

class Meals extends React.Component {
  state = {
    categoriesMeals: [],
    selectedCategory: '',
    comidas: [],
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    const doze = 12;
    const cinco = 5;

    const responseMeals = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const mealsData = await responseMeals.json();
    const dozeMeals = mealsData.meals.slice(0, doze);

    const responseCategories = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const mealsCategoriesData = await responseCategories.json();
    const cincoCategoriesMeals = mealsCategoriesData.meals.slice(0, cinco);

    dispatch(recipesMeals(dozeMeals));

    this.setState({
      categoriesMeals: cincoCategoriesMeals,
      selectedCategory: '',
      comidas: dozeMeals,
    });
  }

  categorySelected = async ({ target }) => {
    const { selectedCategory, comidas } = this.state;
    const { dispatch } = this.props;
    const doze = 12;

    const selectedData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${target.id}`);
    const categoryData = await selectedData.json();
    const dozeCategories = categoryData.meals.slice(0, doze);
    dispatch(recipesMeals(dozeCategories));

    this.setState({ selectedCategory: target.id });

    if (target.id === selectedCategory) {
      dispatch(recipesMeals(comidas));
      this.setState({ selectedCategory: '' });
    }
  };

  mealsRender = () => {
    const { categoriesMeals } = this.state;
    const { mealsState } = this.props;

    return (
      <section>
        <button
          type="button"
          onClick={ () => { this.componentDidMount(); } }
          data-testid="All-category-filter"
        >
          All
        </button>
        <Header pageName="Meals" />
        {categoriesMeals.map((ele, index2) => (
          <div key={ index2 }>
            <button
              type="button"
              id={ ele.strCategory }
              onClick={ this.categorySelected }
              data-testid={ `${ele.strCategory}-category-filter` }
            >
              { ele.strCategory }
            </button>
          </div>
        ))}

        {mealsState.map((ele, index) => (
          <Link to={ `/meals/${ele.idMeal}` } key={ index }>
            <div key={ index } data-testid={ `${index}-recipe-card` }>
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
  mealsState: state.recipes.meals,
});

export default connect(mapStateToProps)(Meals);
