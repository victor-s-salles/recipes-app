import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/RenderWith';
import App from '../App';

describe('Pagina de Login', () => {
  test('1 - Verifica a pagina de Drinks', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });

    expect(history.location.pathname).toBe('/drinks');

    expect(screen.getByText('RECIPES')).toBeInTheDocument();
  });
  test('2 - Verifica a pagina de Meals', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/meals');
    });

    expect(history.location.pathname).toBe('/meals');

    expect(screen.getByText('RECIPES')).toBeInTheDocument();
  });
});
