import React from 'react';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './helpers/RenderWith';
import App from '../App';

describe('Barra de busca', () => {
  test('1 - Verifica a pagina de Drinks', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/drinks');
    });

    expect(history.location.pathname).toBe('/drinks');

    // expect(screen.getByText('Drinks')).toBeInTheDocument();
  });
});
