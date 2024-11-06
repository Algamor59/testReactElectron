// src/renderer/components/MatchTable.tsx
import React from 'react';
import '../App.css'; // Assurez-vous d'importer le CSS si nécessaire

interface Match {
  id: number;
  date: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  homeLogo: string;
  awayLogo: string;
}

interface MatchTableProps {
  matches: Match[];
}

const MatchTable: React.FC<MatchTableProps> = ({ matches }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Équipe Domicile</th>
            <th>Score</th>
            <th>Équipe Extérieure</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match) => (
            <tr key={match.id}>
              <td>{match.date}</td>
              <td>
                <img src={match.homeLogo} alt={match.homeTeam} style={{ width: '40px', height: 'auto', marginRight: '10px' }} />
                {match.homeTeam}
              </td>
              <td>{match.homeScore} - {match.awayScore}</td>
              <td>
                <img src={match.awayLogo} alt={match.awayTeam} style={{ width: '40px', height: 'auto', marginRight: '10px' }} />
                {match.awayTeam}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatchTable;
