import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import GitHubUsersPage from './index';

// Mock fetch
global.fetch = jest.fn();

// Mock data
const mockUsers = [
  {
    id: 1,
    login: 'octocat',
    avatar_url: 'https://github.com/images/error/octocat_happy.gif',
  },
  {
    id: 2,
    login: 'defunkt',
    avatar_url: 'https://github.com/images/error/defunkt.gif',
  },
];

const mockUserDetails = {
  id: 1,
  login: 'octocat',
  name: 'The Octocat',
  avatar_url: 'https://github.com/images/error/octocat_happy.gif',
  bio: 'This is a test bio',
  location: 'San Francisco',
  public_repos: 42,
  followers: 1000,
  following: 42,
  blog: 'https://octocat.blog',
};

describe('GitHubUsersPage', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('renders the title', () => {
    render(<GitHubUsersPage />);
    expect(screen.getByText(/GitHub Users/i)).toBeInTheDocument();
  });

  it('renders the search input', () => {
    render(<GitHubUsersPage />);
    const input = screen.getByLabelText(/Search GitHub username/i);
    expect(input).toBeInTheDocument();
  });

  it('renders the Search button', () => {
    render(<GitHubUsersPage />);
    const button = screen.getByRole('button', { name: /Search user/i });
    expect(button).toBeInTheDocument();
  });

  it('renders the Refresh button', () => {
    render(<GitHubUsersPage />);
    const button = screen.getByRole('button', { name: /Refresh users/i });
    expect(button).toBeInTheDocument();
  });

  it('shows loading state initially', () => {
    fetch.mockImplementation(() => new Promise(() => {}));
    render(<GitHubUsersPage />);
    expect(screen.getByText(/Loading users.../i)).toBeInTheDocument();
  });

  it('fetches and displays users on mount', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });

    render(<GitHubUsersPage />);

    await waitFor(() => {
      expect(screen.getByText('octocat')).toBeInTheDocument();
      expect(screen.getByText('defunkt')).toBeInTheDocument();
    });
  });

  it('displays error message when fetch fails', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    render(<GitHubUsersPage />);

    await waitFor(() => {
      expect(screen.getByText(/Error/i)).toBeInTheDocument();
    });
  });

  it('filters users by search term', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });

    render(<GitHubUsersPage />);

    await waitFor(() => {
      expect(screen.getByText('octocat')).toBeInTheDocument();
    });

    const input = screen.getByLabelText(/Search GitHub username/i);
    fireEvent.change(input, { target: { value: 'octo' } });

    expect(screen.getByText('octocat')).toBeInTheDocument();
    expect(screen.queryByText('defunkt')).not.toBeInTheDocument();
  });

  it('shows "No users found" when search has no results', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });

    render(<GitHubUsersPage />);

    await waitFor(() => {
      expect(screen.getByText('octocat')).toBeInTheDocument();
    });

    const input = screen.getByLabelText(/Search GitHub username/i);
    fireEvent.change(input, { target: { value: 'nonexistent' } });

    expect(screen.getByText(/No users found/i)).toBeInTheDocument();
  });

  it('fetches user details when search is submitted', async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockUsers,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockUserDetails,
      });

    render(<GitHubUsersPage />);

    await waitFor(() => {
      expect(screen.getByText('octocat')).toBeInTheDocument();
    });

    const input = screen.getByLabelText(/Search GitHub username/i);
    const searchButton = screen.getByRole('button', { name: /Search user/i });

    fireEvent.change(input, { target: { value: 'octocat' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText('The Octocat')).toBeInTheDocument();
      expect(screen.getByText('This is a test bio')).toBeInTheDocument();
    });
  });

  it('fetches user details when Enter key is pressed', async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockUsers,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockUserDetails,
      });

    render(<GitHubUsersPage />);

    await waitFor(() => {
      expect(screen.getByText('octocat')).toBeInTheDocument();
    });

    const input = screen.getByLabelText(/Search GitHub username/i);

    fireEvent.change(input, { target: { value: 'octocat' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(screen.getByText('The Octocat')).toBeInTheDocument();
    });
  });

  it('fetches user details when clicking on a user card', async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockUsers,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockUserDetails,
      });

    render(<GitHubUsersPage />);

    await waitFor(() => {
      expect(screen.getByText('octocat')).toBeInTheDocument();
    });

    const userCard = screen.getByText('octocat').closest('div');
    fireEvent.click(userCard);

    await waitFor(() => {
      expect(screen.getByText('The Octocat')).toBeInTheDocument();
    });
  });

  it('closes user details modal when close button is clicked', async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockUsers,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockUserDetails,
      });

    render(<GitHubUsersPage />);

    await waitFor(() => {
      expect(screen.getByText('octocat')).toBeInTheDocument();
    });

    const viewProfileButton = screen.getByRole('button', { name: /View Profile/i });
    fireEvent.click(viewProfileButton);

    await waitFor(() => {
      expect(screen.getByText('The Octocat')).toBeInTheDocument();
    });

    const closeButton = screen.getByRole('button', { name: /Close/i });
    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText('The Octocat')).not.toBeInTheDocument();
    });
  });

  it('displays learning concepts section', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });

    render(<GitHubUsersPage />);

    await waitFor(() => {
      expect(screen.getByText(/Learning Concepts/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/useEffect with async:/i)).toBeInTheDocument();
    expect(screen.getByText(/Loading State:/i)).toBeInTheDocument();
    expect(screen.getByText(/Error Handling:/i)).toBeInTheDocument();
  });

  it('refreshes users when Refresh button is clicked', async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: async () => mockUsers,
    });

    render(<GitHubUsersPage />);

    await waitFor(() => {
      expect(screen.getByText('octocat')).toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalledTimes(1);

    const refreshButton = screen.getByRole('button', { name: /Refresh users/i });
    fireEvent.click(refreshButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2);
    });
  });
});
