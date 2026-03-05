import React, { useState } from 'react';

export default function CounterPage() {
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
