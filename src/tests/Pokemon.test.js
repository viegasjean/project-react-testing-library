import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

const pikachu = pokemons[0];

describe('Testa o component Pokedex', () => {
  test('se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ pikachu } isFavorite showDetailsLink />);

    expect(screen.getByTestId('pokemon-name')).toBeInTheDocument();
    expect(screen.getByText(pikachu.name)).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-type')).toBeInTheDocument();
    expect(screen.getByText(pikachu.type)).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-weight')).toBeInTheDocument();
    const image = screen.getByAltText('Pikachu sprite');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    const favImage = screen.getByAltText(/favorite/);
    expect(favImage).toHaveAttribute('src', '/star-icon.svg');
  });

  test('se ao clicar no link é feito o redirecionamento', () => {
    const { history } = renderWithRouter(
      <Pokemon pokemon={ pikachu } isFavorite showDetailsLink />,
    );

    const linkToDetails = screen.getByRole('link', { name: 'More details' });
    expect(linkToDetails).toBeInTheDocument();
    userEvent.click(linkToDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
});
