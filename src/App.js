import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/Welcome';
import CounterPage from './pages/CounterPage';
import TodoPage from './pages/TodoPage';
import GitHubUsersPage from './pages/GitHubUsers';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/counter" element={<CounterPage />} />
        <Route path="/todos" element={<TodoPage />} />
        <Route path="/github-users" element={<GitHubUsersPage />} />
      </Routes>
    </Router>
  );
}
