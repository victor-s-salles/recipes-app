import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile({ history }) {
  const [email, setEmail] = useState('asas');

  const getLocalStorageEmail = () => {
    const emailLocalStorage = JSON.parse(localStorage.getItem('user'));
    if (!emailLocalStorage) {
      // history.push('/');
    } else {
      setEmail(emailLocalStorage.email);
    }
  };

  const logoutButton = () => {
    localStorage.clear();
    history.push('/');
  };

  useEffect(() => {
    getLocalStorageEmail();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header pageName="Profile" searchingOFF />
      <p data-testid="profile-email">{ email }</p>
      <button
        data-testid="profile-done-btn"
        type="button"
        src="aas"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ logoutButton }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default Profile;
