import React from 'react';

function Login() {
  return (
    <form className="login-form">
      <label htmlFor="email">
        <p>Email:</p>
        <input id="email" name="email" data-testid="email-input" />
      </label>
      <label htmlFor="password">
        <p>Senha:</p>
        <input id="password" name="password" data-testid="password-input" />
      </label>
      <button type="button" data-testid="login-submit-btn">Login</button>
    </form>
  );
}

export default Login;
