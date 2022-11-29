import React, { useEffect, useState } from 'react';

function Login(/* { history } */) {
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

  const onClickButton = () => {
    // history.push('/meals');
  };

  useEffect(() => {
    const buttonDisableControl = () => {
      const emailConditions = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+?$/i;
      const passwordMinLength = 6;
      if (emailConditions.test(inputValue.email)
        && inputValue.password.length > passwordMinLength) {
        setButtonDisable(false);
      }
    };

    buttonDisableControl();
  }, [inputValue]);

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
        onClick={ onClickButton }
      >
        Login
      </button>
    </form>
  );
}

export default Login;
