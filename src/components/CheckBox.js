import React from 'react';

function CheckBox({ ingredient, index,
  handleCheckedMain, check }) {
  return (
    <>
      {' '}
      <label
        htmlFor={ ingredient }
        data-testid={ `${index}-ingredient-step` }
        className={ check ? 'addedIngredient' : 'NotaddedIngredient' }
      >
        {ingredient}
        <input
          type="checkbox"
          id={ ingredient }
          name={ ingredient }
          onClick={ handleCheckedMain }
          checked={ check }

        />
      </label>

    </>
  );
}
CheckBox.propTypes = {
}.isRequired;

export default CheckBox;
