import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ pageName, searchingOFF }) {
  const [searchDisplay, setSearchDisplay] = useState(false);
  const history = useHistory();
  return (
    <div>
      <h1 data-testid="page-title">
        {pageName}
        {' '}
      </h1>
      <button
        type="button"
        onClick={ () => {
          history.push('/profile');
        } }
      >
        <img
          src={ profileIcon }
          data-testid="profile-top-btn"
          alt="Ícone de Perfil"
        />
      </button>
      {!searchingOFF && (
        <div>
          <button
            type="button"
            onClick={ () => {
              setSearchDisplay(!searchDisplay);
            } }
          >
            <img
              src={ searchIcon }
              data-testid="search-top-btn"
              alt="Ícone de Perfil de busca"
            />
          </button>
          {searchDisplay && <SearchBar />}
        </div>
      )}
    </div>
  );
}

Header.propTypes = {
  pageName: PropTypes.string.isRequired,
  searchingOFF: PropTypes.bool,
};
Header.defaultProps = {
  searchingOFF: false,
};

export default Header;
