import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import doneRecipes from './helpers/mocks/mockDataDoneRecipes';
import App from '../App';

describe('Testa a página de Receitas feitas', () => {
  it('Testa se o Header foi renderizado na página', () => {
    const { history } = renderWithRouterAndRedux(<App />, { initialEntries: ['/done-recipes'] });
    expect(history.location.pathname).toBe('/done-recipes');
    expect(screen.getByText('Done Recipes')).toBeInTheDocument();
  });
});
