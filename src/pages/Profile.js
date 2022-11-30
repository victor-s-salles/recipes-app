import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile({ history }) {
  const [email, setEmail] = useState('');

  const getLocalStorageEmail = () => {
    const emailLocalStorage = JSON.parse(localStorage.getItem('user'));
    setEmail(emailLocalStorage.email);
  };

  const logoutButton = () => {
    localStorage.removeItem('user');
    history.push('/');
  };

  useEffect(() => {
    getLocalStorageEmail();
  }, []);

  return (
    <div>
      <Header />
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
