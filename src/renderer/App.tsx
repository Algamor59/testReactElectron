// src/renderer/App.tsx
import React from 'react';
import LeagueMatches from './components/LeagueMatches';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <LeagueMatches />
    </div>
  );
};

export default App;
