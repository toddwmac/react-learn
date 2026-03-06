import { render, screen, fireEvent } from '@testing-library/react';
import TodoPage from './index';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value.toString(); },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('TodoPage', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it('renders the title', () => {
    render(<TodoPage />);
    expect(screen.getByText(/Todo List/i)).toBeInTheDocument();
  });

  it('renders the input field', () => {
    render(<TodoPage />);
    const input = screen.getByLabelText(/New todo input/i);
    expect(input).toBeInTheDocument();
  });

  it('renders the Add button', () => {
    render(<TodoPage />);
    const button = screen.getByRole('button', { name: /Add todo/i });
    expect(button).toBeInTheDocument();
  });

  it('adds a new todo when Add button is clicked', () => {
    render(<TodoPage />);
    const input = screen.getByLabelText(/New todo input/i);
    const button = screen.getByRole('button', { name: /Add todo/i });

    fireEvent.change(input, { target: { value: 'Test todo' } });
    fireEvent.click(button);

    expect(screen.getByText('Test todo')).toBeInTheDocument();
  });

  it('adds a new todo when Enter key is pressed', () => {
    render(<TodoPage />);
    const input = screen.getByLabelText(/New todo input/i);

    fireEvent.change(input, { target: { value: 'Test todo' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(screen.getByText('Test todo')).toBeInTheDocument();
  });

  it('does not add empty todos', () => {
    render(<TodoPage />);
    const input = screen.getByLabelText(/New todo input/i);
    const button = screen.getByRole('button', { name: /Add todo/i });

    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(button);

    expect(screen.queryByText(/Test todo/i)).not.toBeInTheDocument();
  });

  it('toggles todo completion', () => {
    render(<TodoPage />);
    const input = screen.getByLabelText(/New todo input/i);
    const button = screen.getByRole('button', { name: /Add todo/i });

    fireEvent.change(input, { target: { value: 'Test todo' } });
    fireEvent.click(button);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it('deletes a todo', () => {
    render(<TodoPage />);
    const input = screen.getByLabelText(/New todo input/i);
    const button = screen.getByRole('button', { name: /Add todo/i });

    fireEvent.change(input, { target: { value: 'Test todo' } });
    fireEvent.click(button);

    const deleteButton = screen.getByRole('button', { name: /Delete todo: Test todo/i });
    fireEvent.click(deleteButton);

    expect(screen.queryByText('Test todo')).not.toBeInTheDocument();
  });

  it('shows "No todos to display" when empty', () => {
    render(<TodoPage />);
    expect(screen.getByText(/No todos to display/i)).toBeInTheDocument();
  });

  it('renders filter buttons', () => {
    render(<TodoPage />);
    expect(screen.getByRole('button', { name: /Show all todos/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Show active todos/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Show completed todos/i })).toBeInTheDocument();
  });

  it('filters todos by active', () => {
    render(<TodoPage />);
    const input = screen.getByLabelText(/New todo input/i);
    const button = screen.getByRole('button', { name: /Add todo/i });

    fireEvent.change(input, { target: { value: 'Test todo' } });
    fireEvent.click(button);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    const activeButton = screen.getByRole('button', { name: /Show active todos/i });
    fireEvent.click(activeButton);

    expect(screen.queryByText('Test todo')).not.toBeInTheDocument();
  });

  it('filters todos by completed', () => {
    render(<TodoPage />);
    const input = screen.getByLabelText(/New todo input/i);
    const button = screen.getByRole('button', { name: /Add todo/i });

    fireEvent.change(input, { target: { value: 'Test todo' } });
    fireEvent.click(button);

    const completedButton = screen.getByRole('button', { name: /Show completed todos/i });
    fireEvent.click(completedButton);

    expect(screen.queryByText('Test todo')).not.toBeInTheDocument();
  });
});
