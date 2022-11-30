import React from 'react';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testa página Profile', () => {
  test('Testa se o email do usuário está na tela', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const emailInput = screen.queryByTestId('email-input');
    const password = screen.queryByTestId('password-input');
    userEvent.type(emailInput, 'teste@teste.com');
    userEvent.type(password, '1234567');
    const loginButton = screen.queryByRole('button', { name: 'Login' });
    userEvent.click(loginButton);

    act(() => {
      history.push('/profile');
    });

    const { pathname } = history.location;
    expect(pathname).toBe('/profile');

    const profileEmail = screen.queryByTestId('profile-email');
    expect(profileEmail.innerHTML).toBe('teste@teste.com');
  });
});
