import React, { useEffect, useState } from 'react';

function Login() {
  const [buttonDisable, setButtonDisable] = useState(true);
  const [inputValue, setInputValue] = useState({
    email: '',
    password: '',
  });

  const onInputChange = (event) => {
    setInputValue({
      ...inputValue,
      [event.target.name]: event.target.value,
    });
  };

  const buttonDisableControl = () => {

  };

  useEffect(() => {
    buttonDisableControl();
  }, []);

  return (
    <form className="login-form">
      <label htmlFor="email">
        <p>Email:</p>
        <input
          data-testid="email-input"
          id="email"
          name="email"
          value={ inputValue.email }
          onChange={ onInputChange }
        />
      </label>
      <label htmlFor="password">
        <p>Senha:</p>
        <input
          data-testid="password-input"
          id="password"
          name="password"
          value={ inputValue.password }
          onChange={ onInputChange }
        />
      </label>
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ buttonDisable }
      >
        Login
      </button>
    </form>
  );
}

export default Login;
