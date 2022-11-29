import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ pageName, history }) {
  return (
    <div>
      <h1 data-testid="page-title">
        {pageName}
        {' '}
      </h1>
      <button
        type="button"
        onClick={ () => { history.push('/profile'); } }
      >
        <img
          src={ profileIcon }
          data-testid="profile-top-btn"
          alt="Ícone de Perfil"
        />
      </button>
      <button
        type="button"
      >
        <img
          src={ searchIcon }
          data-testid="search-top-btn"
          alt="Ícone de Perfil de busca"
        />
      </button>
    </div>
  );
}

Header.propTypes = {
  pageName: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Header;
