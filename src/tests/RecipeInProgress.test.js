import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import drinkID from './helpers/mocks/drinkID';
import mealsID from './helpers/mocks/mealsID';

describe('Pagina de Recipes', () => {
  test('1 - Verifica a pagina de DRINKS in progress', async () => {
    jest.spyOn(global, 'fetch');

    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinkID),
    });

    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks/17222/in-progress'] });
    expect(history.location.pathname).toBe('/drinks/17222/in-progress');

    expect(global.fetch).toBeCalledTimes(1);
    expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=17222');

    expect(await screen.findByText('A1')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();

    const check = screen.getByTestId('0-ingredient-step');

    expect(check).toBeInTheDocument();

    expect(screen.getByLabelText('Gin')).toBeInTheDocument();

    userEvent.click(check);
    userEvent.click(check);
  });

  test('2 - Verifica a pagina de MEALS in progress', async () => {
    jest.spyOn(global, 'fetch');

    // Usando o arquivo 'mealsID' que eh o mock
    global.fetch.mockResolvedValue({ json: jest.fn().mockResolvedValue(mealsID) });

    // Entrando direto na pagina de MEALS in progress usando o pathname '/meals/53060/in-progress'
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals/53060/in-progress'] });
    expect(history.location.pathname).toBe('/meals/53060/in-progress');

    // Testando se a API com ID correto 53060 foi chamado
    // Passando o fetch no expect, tambem poderia ser global.fetch, como na linha 49
    expect(fetch).toBeCalledTimes(1);
    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/lookup.php?i=53060');

    // No primeiro teste do que eh renderizado PRECISA TER O AWAIT e o FIND,
    // se nao nem renderiza, basta ter no primeiro expect de coisas renderizadas na tela
    expect(await screen.findByText('Croatian')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();

    const check = screen.getByTestId('0-ingredient-step');

    expect(check).toBeInTheDocument();
    expect(screen.getByLabelText('Filo Pastry')).toBeInTheDocument();

    userEvent.click(check);
    userEvent.click(check);
  });
});
