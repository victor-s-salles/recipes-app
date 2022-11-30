import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Meals from '../pages/Meals';
import Drinks from '../pages/Drinks';

class Recipes extends React.Component {
  state = { url: window.location.pathname };

  render() {
    const { url } = this.state;
    return (
      <div>
        <h1>RECIPES</h1>
        {url === '/meals' ? (<Meals />) : null}
        {url === '/drinks' ? (<Drinks />) : null}
      </div>
    );
  }
}

Recipes.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  drinks: state.drinks,
  meals: state.meals,
});

export default connect(mapStateToProps)(Recipes);
