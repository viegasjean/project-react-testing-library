import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Testa o component About', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });
  test('se a página contém um heading h2 com o texto About Pokédex', () => {
    const aboutTitle = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(aboutTitle).toBeInTheDocument();
  });

  test('se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const pokemonText = screen.getAllByText(/pokémons/i);
    expect(pokemonText).toHaveLength(2);
    pokemonText.forEach((text) => {
      expect(text).toBeInTheDocument();
    });
  });

  test('se a página contém a seguinte imagem de uma Pokédex', () => {
    const image = screen.getByAltText(/pokédex/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(image).toHaveAttribute('alt', 'Pokédex');
  });
});
