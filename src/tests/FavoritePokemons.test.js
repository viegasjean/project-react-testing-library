import React from 'react';
import { screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';
import pokemons from './favPokeMock';

describe('Testa o component FavoritePokemons', () => {
  test('se é exibido No favorite pokemon found, se não tiver pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);
    const pokeNotFount = screen.getByText('No favorite pokemon found');
    expect(pokeNotFount).toBeInTheDocument();
  });

  test('se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    expect(screen.getByText('Charmander')).toBeInTheDocument();
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });
});
