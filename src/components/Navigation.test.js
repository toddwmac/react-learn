import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navigation from './Navigation';

describe('Navigation', () => {
  it('renders all navigation links', () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    expect(screen.getByText('Welcome')).toBeInTheDocument();
    expect(screen.getByText('Counter')).toBeInTheDocument();
    expect(screen.getByText('Todos')).toBeInTheDocument();
  });

  it('renders navigation links as anchor tags', () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    const welcomeLink = screen.getByText('Welcome');
    const counterLink = screen.getByText('Counter');
    const todosLink = screen.getByText('Todos');

    expect(welcomeLink.tagName).toBe('A');
    expect(counterLink.tagName).toBe('A');
    expect(todosLink.tagName).toBe('A');
  });

  it('has correct href attributes', () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    const welcomeLink = screen.getByText('Welcome');
    const counterLink = screen.getByText('Counter');
    const todosLink = screen.getByText('Todos');

    expect(welcomeLink).toHaveAttribute('href', '/');
    expect(counterLink).toHaveAttribute('href', '/counter');
    expect(todosLink).toHaveAttribute('href', '/todos');
  });
});
