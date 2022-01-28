import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('deve renderizar o componente App', () => {
  renderWithRouter(<App />);

  const homeLink = screen.getByRole('link', { name: 'Home' });
  expect(homeLink).toBeInTheDocument();
  // userEvent.click(homeLink);

  const homeTitle = screen.getByRole('heading', {
    level: 1,
    name: 'Pokédex',
  });

  expect(homeTitle).toBeInTheDocument();
});

test('deve renderizar o componente Sobre', () => {
  const { history } = renderWithRouter(<App />);

  const aboutLink = screen.getByRole('link', { name: 'About' });
  expect(aboutLink).toBeInTheDocument();
  userEvent.click(aboutLink);

  const { pathname } = history.location;
  expect(pathname).toBe('/about');

  const aboutTitle = screen.getByRole('heading', {
    level: 2,
    name: 'About Pokédex',
  });
  expect(aboutTitle).toBeInTheDocument();
});

test('deve renderizar o componente FavoritePokemons', () => {
  const { history } = renderWithRouter(<App />);

  const aboutLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
  expect(aboutLink).toBeInTheDocument();
  userEvent.click(aboutLink);

  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');

  const aboutTitle = screen.getByRole('heading', {
    level: 2,
    name: 'Favorite pokémons',
  });
  expect(aboutTitle).toBeInTheDocument();
});
