import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
    console.log(dozeDrinks);

    const responseCategories = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const categoriesDrinkData = await responseCategories.json();
    const cincoCategoriesDrinks = categoriesDrinkData.drinks.slice(0, cinco);
    console.log(cincoCategoriesDrinks);

    dispatch(recipesDrinks(dozeDrinks));
    this.setState({
      bebidas: dozeDrinks,
      categoriesDrink: cincoCategoriesDrinks,
    });
  }

  drinksRender = () => {
    const { bebidas, categoriesDrink } = this.state;

    return (
      <section>
        {categoriesDrink.map((ele, index2) => (
          <div key={ index2 }>
            <button
              type="button"
              data-testid={ `${ele.strCategory}-category-filter` }
            >
              { ele.strCategory }
            </button>
          </div>
        ))}
        {bebidas.map((ele, index) => (
          <Link to={ `/drinks/${ele.idDrink}` } key={ index }>
            <div data-testid={ `${index}-recipe-card` }>
              <img
                src={ ele.strDrinkThumb }
                alt={ `${ele.strDrink} imagem` }
                width="200px"
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{ele.strDrink}</p>
            </div>
          </Link>
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
  drinks: state.drinks,
});

export default connect(mapStateToProps)(Drinks);
