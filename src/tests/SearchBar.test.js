import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import mockDataMeals from './helpers/mocks/mockDataMeals';
import mockDataDrinks from './helpers/mocks/mockDataDrinks';

describe('Testa o componente da barra de busca do header', () => {
  const activeSearchID = 'search-top-btn';
  const searchInputID = 'search-input';
  const searchButtonID = 'exec-search-btn';
  const ingredientRadioID = 'ingredient-search-radio';
  const nameRadioID = 'name-search-radio';
  const firstLetterRadioID = 'first-letter-search-radio';

  it('Testa uma busca na rota /meals', async () => {
    jest.spyOn(global, 'fetch');

    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockDataMeals),
    });

    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/meals'] });
    expect(history.location.pathname).toBe('/meals');

    expect(fetch).toBeCalledTimes(1);
    expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const searchTopBtn = screen.getByTestId(activeSearchID);

    expect(searchTopBtn).toBeInTheDocument();
    userEvent.click(searchTopBtn);

    const searchInput = screen.getByTestId(searchInputID);
    const searchButton = screen.getByTestId(searchButtonID);
    const ingredientRadio = screen.getByTestId(ingredientRadioID);
    const nameRadio = screen.getByTestId(nameRadioID);
    const firstLetterRadio = screen.getByTestId(firstLetterRadioID);

    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();

    userEvent.type(searchInputID, 'beef');
    userEvent.click(ingredientRadio);
    userEvent.click(searchButton);

    userEvent.type(searchInputID, 'ch');
    userEvent.click(firstLetterRadio);
    userEvent.click(searchButton);

    userEvent.type(searchInputID, 'Arrabiata');
    userEvent.click(nameRadio);
    userEvent.click(searchButton);
  });

  it('Testa uma busca na rota /drink', async () => {
    jest.spyOn(global, 'fetch');

    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockDataDrinks),
    });

    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/drinks'] });
    expect(history.location.pathname).toBe('/drinks');

    expect(fetch).toBeCalledTimes(1);
    expect(fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');

    const searchTopBtn = screen.getByTestId(activeSearchID);

    expect(searchTopBtn).toBeInTheDocument();
    userEvent.click(searchTopBtn);

    const searchInput = screen.getByTestId(searchInputID);
    const searchButton = screen.getByTestId(searchButtonID);
    const ingredientRadio = screen.getByTestId(ingredientRadioID);
    const nameRadio = screen.getByTestId(nameRadioID);
    const firstLetterRadio = screen.getByTestId(firstLetterRadioID);

    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(ingredientRadio).toBeInTheDocument();
    expect(nameRadio).toBeInTheDocument();
    expect(firstLetterRadio).toBeInTheDocument();

    userEvent.type(searchInput, 'lemon');
    userEvent.click(ingredientRadio);
    userEvent.click(searchButton);

    userEvent.type(searchInput, 'ch');
    userEvent.click(firstLetterRadio);
    userEvent.click(searchButton);

    userEvent.type(searchInputID, 'Aquamarine');
    userEvent.click(nameRadio);
    userEvent.click(searchButton);
  });
});
