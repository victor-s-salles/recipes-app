import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ pageName }) {
  return (
    <div>
      <h1 data-testid="page-title">
        {pageName}
        {' '}
      </h1>
      <img
        src={ profileIcon }
        data-testid="profile-top-btn"
        alt="Ícone de Perfil"
      />
      <img
        src={ searchIcon }
        data-testid="search-top-btn"
        alt="Ícone de Perfil de busca"
      />
    </div>
  );
}

Header.propTypes = {
  pageName: PropTypes.string.isRequired,
};

export default Header;
