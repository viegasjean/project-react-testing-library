import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testa o component NotFound', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/xablau');
  });
  test('se a página contem um h2 com o texto Page requested not found', () => {
    const title = screen.getByRole('heading', { name: /page/i });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Page requested not found');
  });
  test('se a página mostra a imagem', () => {
    const image = screen.getByAltText(/pikachu/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
