import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { recipesDrinks } from '../redux/actions';

class Drinks extends React.Component {
  state = {
    bebidas: [],
    categoriesDrink: [],
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    const doze = 12;
    const cinco = 5;

    const responseDrinks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const drinksData = await responseDrinks.json();
    const dozeDrinks = drinksData.drinks.slice(0, doze);

    const responseCategories = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const categoriesDrinkData = await responseCategories.json();
    const cincoCategoriesDrinks = categoriesDrinkData.drinks.slice(0, cinco);

    dispatch(recipesDrinks(dozeDrinks));
    this.setState({
      bebidas: dozeDrinks,
      categoriesDrink: cincoCategoriesDrinks,
      selectedCategory: '',
    });
  }

  categorySelected = async ({ target }) => {
    const { selectedCategory, bebidas } = this.state;
    const { dispatch } = this.props;
    const doze = 12;

    const selectedData = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${target.id}`);
    const categoryData = await selectedData.json();
    const dozeCategories = categoryData.drinks.slice(0, doze);
    dispatch(recipesDrinks(dozeCategories));

    this.setState({ selectedCategory: target.id });

    if (target.id === selectedCategory) {
      dispatch(recipesDrinks(bebidas)); this.setState({ selectedCategory: '' });
    }
  };

  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  drinksRender = () => {
    const { categoriesDrink } = this.state;
    const { drinkState } = this.props;

    return (
      <section>
        <button
          type="button"
          onClick={ () => { this.componentDidMount(); } }
          data-testid="All-category-filter"
        >
          All
        </button>
        {categoriesDrink.map((ele, index2) => (
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
        {drinkState.map((ele, index) => (
          <div
            className="card-recipe"
            key={ index }
            data-testid={ `${index}-recipe-card` }
            onClick={ () => { this.handleClick(); } }
            aria-hidden="true"
          >
            <img
              src={ ele.strDrinkThumb }
              alt={ `${ele.strDrink} imagem` }
              width="200px"
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{ele.strDrink}</p>
          </div>
        ))}
      </section>
    );
  };

  render() {
    return (
      <div>
        <h1>DRINKS</h1>
        {this.drinksRender()}
      </div>
    );
  }
}

Drinks.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  drinkState: state.recipes.drinks,
});

export default connect(mapStateToProps)(Drinks);
