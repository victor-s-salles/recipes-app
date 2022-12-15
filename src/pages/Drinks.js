import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { recipesDrinks } from '../redux/actions';
import Header from '../components/Header';
import '../styles/Drinks.css';

class Drinks extends React.Component {
  state = {
    bebidas: [],
    categoriesDrink: [],
    selectedCategory: '',
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

  drinksRender = () => {
    const { categoriesDrink } = this.state;
    const { drinkState } = this.props;

    return (
      <section>
        <Header pageName="Drinks" />
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
        <div className="drinks-divPai">
          {drinkState.map((ele, index) => (
            <Link to={ `/drinks/${ele.idDrink}` } key={ index } className="drinks-link">
              <div
                className="drinks-Card"
                key={ index }
                data-testid={ `${index}-recipe-card` }
                aria-hidden="true"
              >
                <img
                  src={ ele.strDrinkThumb }
                  alt={ `${ele.strDrink} imagem` }
                  data-testid={ `${index}-card-img` }
                  className="drinks-img"
                />
                <p
                  data-testid={ `${index}-card-name` }
                  className="drinks-nameRecipe"
                >
                  {ele.strDrink}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    );
  };

  render() {
    return (
      <div>
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
