import React from 'react';
import { act } from 'react-dom/test-utils';
// import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockDataMeals from './helpers/mocks/mockDataMeals';
// import mockDataDrinks from './helpers/mocks/mockDataDrinks';

describe('Pagina de Recipes', () => {
  test('1 - Verifica a pagina de Drinks', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('drinks/15997/in-progress');
    });

    expect(history.location.pathname).toBe('/drinks/15997/in-progress');
  });
  test('2 - Verifica a pagina de MEALS', async () => {
    jest.spyOn(global, 'fetch');

    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockDataMeals),
    });

    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });
    expect(history.location.pathname).toBe('/meals');

    expect(fetch).toBeCalledTimes(1);
    expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  });
});
