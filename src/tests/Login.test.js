import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testa página de Login', () => {
  test('Testa se existe o input de email e de senha, além de um botão para login', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.queryByTestId('email-input');
    const password = screen.queryByTestId('password-input');
    const loginButton = screen.queryByRole('button', { name: 'Login' });
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });
  test('Testa se o botão fica desabilitado até o email e a senha estarem corretos', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.queryByTestId('email-input');
    const password = screen.queryByTestId('password-input');
    let loginButton = screen.queryByRole('button', { name: 'Login' });
    expect(loginButton).toBeDisabled();
    userEvent.type(email, 'teste');
    loginButton = screen.queryByRole('button', { name: 'Login' });
    expect(loginButton).toBeDisabled();
    userEvent.type(email, '@teste.com');
    loginButton = screen.queryByRole('button', { name: 'Login' });
    expect(loginButton).toBeDisabled();
    userEvent.type(password, '12345');
    loginButton = screen.queryByRole('button', { name: 'Login' });
    expect(loginButton).toBeDisabled();
    userEvent.type(password, '6');
    loginButton = screen.queryByRole('button', { name: 'Login' });
    expect(loginButton).not.toBeDisabled();
  });
});
