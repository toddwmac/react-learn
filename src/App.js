import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

function CounterPage() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div className="max-w-2xl mx-auto p-8 font-sans">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">My First React App</h1>
      <p className="text-2xl text-center text-gray-600 mb-6">Click count: {count}</p>
      <div className="flex justify-center">
        <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
          Add 1
        </button>
      </div>
      <div className="mt-10 p-6 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Think of this like:</h3>
        <ul className="space-y-2">
          <li><strong className="text-red-500">Component:</strong> Like a Form or UserControl in VB</li>
          <li><strong className="text-red-500">useState:</strong> Like a variable that updates automatically</li>
          <li><strong className="text-red-500">function handleClick:</strong> Like a subroutine/sub in VB</li>
          <li><strong className="text-red-500">{count}:</strong> Like displaying a variable'\''s value</li>
          <li><strong className="text-red-500">onClick:</strong> Like a Click event handler</li>
        </ul>
      </div>
    </div>
  );
}

function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Welcome to React!</h1>
        <p className="text-xl text-gray-600">This is the default welcome page.</p>
        <p className="text-sm text-indigo-600 mt-4">Now with Tailwind CSS!</p>
      </div>
    </div>
  );
}

function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const saved = localStorage.getItem('react-todos');
    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('react-todos', JSON.stringify(todos));
  }, [todos]);

  function addTodo() {
    if (inputValue.trim() !== '') {
      setTodos([...todos, {
        id: Date.now(),
        text: inputValue,
        completed: false
      }]);
      setInputValue('');
    }
  }

  function toggleTodo(id) {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }

  function deleteTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      addTodo();
    }
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter(t => !t.completed).length;
  const completedCount = todos.filter(t => t.completed).length;

  return (
    <div className="max-w-2xl mx-auto p-8 font-sans">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Todo List</h1>

      <div className="flex gap-3 mb-6">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new todo..."
          className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-gray-800"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Add
        </button>
      </div>

      <div className="flex gap-2 mb-6 justify-center">
        <button
          onClick={() => setFilter('all')}
          className={filter === 'all' ? "bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-colors" : "bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-lg font-medium transition-colors"}
        >
          All ({todos.length})
        </button>
        <button
          onClick={() => setFilter('active')}
          className={filter === 'active' ? "bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-colors" : "bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-lg font-medium transition-colors"}
        >
          Active ({activeCount})
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={filter === 'completed' ? "bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-colors" : "bg-gray-200 text-gray-700 hover:bg-gray-300 px-4 py-2 rounded-lg font-medium transition-colors"}
        >
          Completed ({completedCount})
        </button>
      </div>

      {filteredTodos.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <p className="text-xl">No todos to display</p>
          <p className="text-sm mt-2">Add a todo above to get started!</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {filteredTodos.map(todo => (
            <li key={todo.id} className={"flex items-center gap-4 p-4 rounded-lg border-2 transition-all " + (todo.completed ? "bg-green-50 border-green-200" : "bg-white border-gray-200 hover:border-blue-300")}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="w-5 h-5 text-blue-500 rounded focus:ring-blue-500 cursor-pointer"
              />
              <span className={"flex-1 text-lg " + (todo.completed ? "line-through text-gray-400" : "text-gray-800")}>
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg transition-colors"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/counter" element={<CounterPage />} />
        <Route path="/todos" element={<TodoPage />} />
      </Routes>
    </Router>
  );
}
