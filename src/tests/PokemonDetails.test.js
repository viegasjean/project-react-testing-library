import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const pikachu = pokemons[0];

describe('Testa o component PokemonDetails', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: 'More details' }));
  });

  test('se informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    expect(screen.getByText('Pikachu Details')).toBeInTheDocument();
    expect(screen
      .getByRole('heading', { name: 'Summary', level: 2 }))
      .toBeInTheDocument();
    expect(screen.getByText(/electricity/)).toBeInTheDocument();
  });

  test('se existe na página uma seção com os mapas', () => {
    expect(screen
      .getByRole('heading', { name: 'Game Locations of Pikachu', level: 2 }))
      .toBeInTheDocument();

    const pikaLocations = screen.getAllByRole('img', { name: /pikachu location/i });
    pikaLocations.forEach((location, index) => {
      expect(location).toHaveAttribute('src', pikachu.foundAt[index].map);
      expect(location).toHaveAttribute('alt', 'Pikachu location');
    });

    expect(screen.getAllByRole('img', { name: /pikachu location/i }))
      .toHaveLength(pikachu.foundAt.length);

    expect(screen.getAllByAltText(/pikachu location/i))
      .toHaveLength(pikachu.foundAt.length);
  });

  test('se o usuário pode favoritar um pokémon', () => {
    const favCheckBox = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    expect(favCheckBox).toBeInTheDocument();
    userEvent.click(favCheckBox);
    const favImg = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favImg).toBeInTheDocument();
    userEvent.click(favCheckBox);
    expect(favImg).not.toBeInTheDocument();
    expect(screen.getByLabelText(/pokémon favoritado\?/i)).toBeInTheDocument();
  });
});
