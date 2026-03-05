import React from 'react';

export default function WelcomePage() {
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
