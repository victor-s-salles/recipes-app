import React from 'react';
import { useHistory } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import '../App.css';

function Footer() {
  const history = useHistory();
  return (
    <footer data-testid="footer" className="footer">
      <button
        type="button"
        src={ drinkIcon }
        data-testid="drinks-bottom-btn"
        onClick={ () => { history.push('/drinks'); } }
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
        onClick={ () => { history.push('/meals'); } }
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
