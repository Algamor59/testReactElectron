// src/renderer/App.tsx
import React from 'react';
import Top14Matches from './components/Top14Matches';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Top14Matches />
    </div>
  );
};

export default App;
