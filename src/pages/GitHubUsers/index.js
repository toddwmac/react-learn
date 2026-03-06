import { useState, useEffect } from 'react';
import Navigation from '../../components/Navigation';

export default function GitHubUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('https://api.github.com/users?per_page=10');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchUserDetails(username) {
    try {
      setError(null);
      const response = await fetch(`https://api.github.com/users/${username}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setSelectedUser(data);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch user details:', err);
    }
  }

  function handleSearchKeyDown(e) {
    if (e.key === 'Enter') {
      if (searchTerm.trim() !== '') {
        fetchUserDetails(searchTerm.trim());
      }
    }
  }

  function handleSearchClick() {
    if (searchTerm.trim() !== '') {
      fetchUserDetails(searchTerm.trim());
    }
  }

  function closeUserDetails() {
    setSelectedUser(null);
  }

  const filteredUsers = users.filter(user =>
    user.login.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-4xl mx-auto p-8 font-sans">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">GitHub Users</h1>

        {/* Search Section */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            placeholder="Search GitHub username..."
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-800"
            aria-label="Search GitHub username"
          />
          <button
            onClick={handleSearchClick}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            aria-label="Search user"
          >
            Search
          </button>
          <button
            onClick={fetchUsers}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            aria-label="Refresh users"
          >
            Refresh
          </button>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 mb-6">
            <h3 className="text-xl font-semibold text-red-800 mb-2">Error</h3>
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Loading users...</p>
          </div>
        )}

        {/* User Details Modal */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">{selectedUser.login}</h2>
                  <button
                    onClick={closeUserDetails}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                    aria-label="Close"
                  >
                    ×
                  </button>
                </div>
                <div className="flex items-center gap-6 mb-6">
                  <img
                    src={selectedUser.avatar_url}
                    alt={`${selectedUser.login} avatar`}
                    className="w-32 h-32 rounded-lg"
                  />
                  <div>
                    <p className="text-gray-600 mb-2">
                      <strong className="text-gray-800">Name:</strong> {selectedUser.name || 'N/A'}
                    </p>
                    <p className="text-gray-600 mb-2">
                      <strong className="text-gray-800">Bio:</strong> {selectedUser.bio || 'N/A'}
                    </p>
                    <p className="text-gray-600 mb-2">
                      <strong className="text-gray-800">Location:</strong> {selectedUser.location || 'N/A'}
                    </p>
                    <p className="text-gray-600 mb-2">
                      <strong className="text-gray-800">Public Repos:</strong> {selectedUser.public_repos}
                    </p>
                    <p className="text-gray-600 mb-2">
                      <strong className="text-gray-800">Followers:</strong> {selectedUser.followers}
                    </p>
                    <p className="text-gray-600">
                      <strong className="text-gray-800">Following:</strong> {selectedUser.following}
                    </p>
                  </div>
                </div>
                {selectedUser.blog && (
                  <a
                    href={selectedUser.blog}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
                  >
                    Visit Website
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Users List */}
        {!loading && !error && filteredUsers.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-xl">No users found</p>
            <p className="text-sm mt-2">Try a different search term</p>
          </div>
        ) : (
          !loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map(user => (
                <div
                  key={user.id}
                  className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-all cursor-pointer"
                  onClick={() => fetchUserDetails(user.login)}
                >
                  <div className="flex flex-col items-center text-center">
                    <img
                      src={user.avatar_url}
                      alt={`${user.login} avatar`}
                      className="w-24 h-24 rounded-full mb-4"
                    />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{user.login}</h3>
                    <p className="text-gray-600 text-sm mb-4">ID: {user.id}</p>
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        fetchUserDetails(user.login);
                      }}
                    >
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}

        {/* Learning Notes */}
        <div className="mt-12 p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">📚 Learning Concepts</h3>
          <ul className="space-y-2">
            <li><strong className="text-blue-600">useEffect with async:</strong> Fetching data from an API</li>
            <li><strong className="text-blue-600">Loading State:</strong> Showing a spinner while data loads</li>
            <li><strong className="text-blue-600">Error Handling:</strong> Gracefully handling API errors</li>
            <li><strong className="text-blue-600">try/catch/finally:</strong> Proper error handling pattern</li>
            <li><strong className="text-blue-600">Conditional Rendering:</strong> Showing different UI based on state</li>
            <li><strong className="text-blue-600">Modal/Dialog:</strong> Overlay component for user details</li>
            <li><strong className="text-blue-600">Event.stopPropagation:</strong> Preventing event bubbling</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
