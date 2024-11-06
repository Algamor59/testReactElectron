// src/renderer/App.tsx
import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Top14Matches from './components/Top14Matches'; // Assurez-vous que ce chemin est correct

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/top14" element={<Top14Matches />} />
      </Routes>
    </Router>
  );
}

function Hello() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Bienvenue sur l'application de résultats de Rugby</h1>
      <Link to="/top14" style={{ textDecoration: 'none' }}>
        <button type="button">
          🏉 Voir les résultats de Championnat 2024
        </button>
      </Link>
    </div>
  );
}
