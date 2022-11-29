import React from 'react';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';

function Footer({ history }) {
  return (
    <footer data-testid="footer">
      <button
        type="button"
        data-testid="drinks-bottom-btn"
        onClick={ () => { history.push('/drink'); } }
      >
        <img
          src={ drinkIcon }
          alt="drinkIcon"
        />
      </button>
      <button
        type="button"
        src={ mealIcon }
        data-testid="meals-bottom-btn"
        onClick={ () => { history.push('/meal'); } }
      >
        <img
          src={ mealIcon }
          alt="mealIcon"
        />
      </button>
    </footer>
  );
}

Footer.propTypes = {}.isRequired;
export default Footer;
