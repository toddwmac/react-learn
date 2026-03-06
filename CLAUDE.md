# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React 19.2.4 learning project created with Create React App, using react-router-dom v7 for routing and Tailwind CSS for styling. The project is organized to demonstrate React fundamentals, particularly state management with `useState` and `useEffect`.

## Development Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Deploy to GitHub Pages
npm run deploy

# Eject from Create React App (not recommended)
npm run eject
```

Development server runs at `http://localhost:3000`.

## Architecture

### Routing (react-router-dom v7)

The app uses the latest react-router-dom v7 API:
- Components use the new v7 syntax: `HashRouter`, `Routes`, `Route`
- Main routing configuration is in `src/App.js`
- Uses HashRouter for GitHub Pages compatibility

### Page Structure

Pages are organized in `src/pages/` with a nested folder per page:
```
src/pages/
├── Welcome/
│   └── index.js  # Welcome page component
├── CounterPage/
│   └── index.js  # Counter component with useState
└── TodoPage/
    └── index.js  # Todo list with useState, useEffect, localStorage
```

Each page component:
- Imports from its own `index.js` (e.g., `import CounterPage from './pages/CounterPage'`)
- Uses Tailwind CSS for styling
- Includes a shared Navigation component for page navigation

### Components

- `src/components/Navigation.js` - Shared navigation component with links to all pages

### Styling

- Uses Tailwind CSS v3.4.19 for all styling
- Tailwind configuration in `tailwind.config.js`
- PostCSS configuration in `postcss.config.js`
- Global styles imported in `src/index.css`

### ESLint Configuration

- Extends: `eslint:recommended`
- React plugin enabled
- JSX files allowed without extension
- Unused variables are warned (not errors)

### State Management Pattern

The CounterPage demonstrates the basic React state pattern:
- Use `useState` hook for local state
- State updates trigger re-renders automatically
- Event handlers (like `handleClick`) update state directly

The TodoPage demonstrates more advanced patterns:
- `useState` for multiple state variables (todos, input, filter)
- `useEffect` for localStorage persistence
- Array manipulation with map, filter, spread operator
- Event handling with onKeyDown (not deprecated onKeyPress)
