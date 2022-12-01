import React, { /* useEffect */ } from 'react';
import { connect } from 'react-redux';

function FavoriteButton() {
  // const getRecipeTypeAndId = () => {
  //   console.log(actualRecipe);
  // };

  // useEffect(() => {
  //   getRecipeTypeAndId();
  // }, []);

  return (
    <button
      type="button"
      data-testid="favorite-btn"
    >
      Favorite
    </button>
  );
}

const mapStateToProps = (state) => ({
  actualRecipe: state.recipes.recipesForId,
});

export default connect(mapStateToProps)(FavoriteButton);
