# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React 19.2.4 learning project created with Create React App, using react-router-dom v7 for routing. The project is organized to demonstrate React fundamentals, particularly state management with `useState`.

## Development Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject from Create React App (not recommended)
npm run eject
```

Development server runs at `http://localhost:3000`.

## Architecture

### Routing (react-router-dom v7)

The app uses the latest react-router-dom v7 API:
- Components use the new v6 syntax: `Router`, `Routes`, `Route`
- Main routing configuration is in `src/App.js`
- Older v5 style (`Switch`, `Route`) exists in `src/routes/index.js` but is not currently used

### Page Structure

Pages are organized in `src/pages/` with a nested folder per page:
```
src/pages/
├── Welcome/
│   ├── index.js  # Component logic
│   └── styles.js # Styled components
└── CounterPage/
    ├── index.js  # Counter component with useState
    └── styles.js # Styles for CounterPage
```

Each page component:
- Imports from its own `index.js` (e.g., `import CounterPage from '../pages/CounterPage'`)
- Has dedicated styles in `styles.js`
- Uses inline styles or styled components

### ESLint Configuration

- Extends: `eslint:recommended`
- React plugin enabled
- JSX files allowed without extension
- Unresolved variable warnings enabled

### State Management Pattern

The CounterPage demonstrates the basic React state pattern:
- Use `useState` hook for local state
- State updates trigger re-renders automatically
- Event handlers (like `handleClick`) update state directly
