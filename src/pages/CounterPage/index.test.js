import { render, screen, fireEvent } from '@testing-library/react';
import CounterPage from './index';

describe('CounterPage', () => {
  it('renders initial count as 0', () => {
    render(<CounterPage />);
    expect(screen.getByText(/Click count: 0/i)).toBeInTheDocument();
  });

  it('increments count when button is clicked', () => {
    render(<CounterPage />);
    const button = screen.getByRole('button', { name: /increment counter/i });
    fireEvent.click(button);
    expect(screen.getByText(/Click count: 1/i)).toBeInTheDocument();
  });

  it('increments count multiple times', () => {
    render(<CounterPage />);
    const button = screen.getByRole('button', { name: /increment counter/i });
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    expect(screen.getByText(/Click count: 3/i)).toBeInTheDocument();
  });

  it('renders the title', () => {
    render(<CounterPage />);
    expect(screen.getByText(/My First React App/i)).toBeInTheDocument();
  });

  it('renders the explanation box', () => {
    render(<CounterPage />);
    expect(screen.getByText(/Think of this like:/i)).toBeInTheDocument();
  });
});
