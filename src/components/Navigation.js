import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className="bg-white shadow-md mb-8">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex justify-center gap-6">
          <Link 
            to="/" 
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Welcome
          </Link>
          <Link 
            to="/counter" 
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Counter
          </Link>
          <Link 
            to="/todos" 
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            Todos
          </Link>
          <Link 
            to="/github-users" 
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
          >
            GitHub Users
          </Link>
        </div>
      </div>
    </nav>
  );
}
