import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Counter page component
function CounterPage() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div className="app-container">
      <h1>My First React App</h1>

      <p>Click count: {count}</p>

      <button onClick={handleClick}>
        Add 1
      </button>

      <div className="box">
        <h3>Think of this like:</h3>
        <ul>
          <li><strong>Component:</strong> Like a Form or UserControl in VB</li>
          <li><strong>useState:</strong> Like a variable that updates automatically</li>
          <li><strong>function handleClick:</strong> Like a subroutine/sub in VB</li>
          <li><strong>{count}:</strong> Like displaying a variable's value</li>
          <li><strong>onClick:</strong> Like a Click event handler</li>
        </ul>
      </div>
    </div>
  );
}

// Welcome page component
function WelcomePage() {
  return (
    <div className="welcome-page">
      <h1>Welcome to React!</h1>
      <p>This is the default welcome page.</p>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/counter" element={<CounterPage />} />
      </Routes>
    </Router>
  );
}
