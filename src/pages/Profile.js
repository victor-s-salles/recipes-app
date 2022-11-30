import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Profile({ history }) {
  const [email, setEmail] = useState('');

  const getLocalStorageEmail = () => {
    const emailLocalStorage = JSON.parse(localStorage.getItem('user'));
    setEmail(emailLocalStorage.email);
  };

  useEffect(() => {
    getLocalStorageEmail();
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      <p data-testid="profile-email">{ email }</p>
      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        type="button"
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
      >
        Logout
      </button>
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default Profile;
