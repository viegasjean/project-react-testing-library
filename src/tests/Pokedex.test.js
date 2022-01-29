import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

describe('Testa o component Pokedex', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('se página contém um heading h2 com o texto Encountered pokémons', () => {
    const h2 = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(h2).toBeInTheDocument();
  });

  test('se é exibido o próximo Pokémon quando o botão Próximo pokémon é clicado', () => {
    const btnNextPoke = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });

    pokemons.forEach((pokemon) => {
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
      userEvent.click(btnNextPoke);
    });

    expect(screen.getByText(pokemons[0].name)).toBeInTheDocument();
  });

  test('se é mostrado apenas um Pokémon por vez', () => {
    expect(screen.getAllByTestId('pokemon-name')).toHaveLength(1);
  });

  test('se a Pokédex tem os botões de filtro', () => {
    const pokeTypes = [...new Set(pokemons
      .reduce((types, { type }) => [...types, type], []))];

    expect(screen.getAllByTestId('pokemon-type-button')).toHaveLength(pokeTypes.length);

    pokeTypes.forEach((type) => {
      const filterButton = screen.getByRole('button', { name: type });
      userEvent.click(filterButton);
      expect(filterButton).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
    });
  });

  test('se a Pokédex contém um botão para resetar o filtro', () => {
    const filterAll = screen.getByRole('button', { name: 'All' });
    expect(filterAll).toBeInTheDocument();
    userEvent.click(filterAll);
  });
});
