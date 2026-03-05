import React, { useState } from 'react';
import './styles.js';

export default function CounterPage() {
  const [count, setCount] = useState(0);

  function handleAdd() {
    setCount(count + 1);
  }

  function handleSubtract() {
    setCount(count - 1);
  }

  return (
    <div className="app-container">
      <h1>My First React App</h1>

      <p>Click count: {count}</p>

      <button onClick={handleAdd}>
        Increment
      </button>

      <button onClick={handleSubtract} style={{ marginLeft: '10px' }}>
        Decrement
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
