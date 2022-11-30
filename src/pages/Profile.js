import React, { useEffect, useState } from 'react';

function Profile() {
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
      <p>{ email }</p>
    </div>
  );
}

export default Profile;
