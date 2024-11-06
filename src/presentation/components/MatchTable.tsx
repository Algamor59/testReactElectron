// src/presentation/components/MatchTable.tsx
import React from 'react';
import { Match } from '../../core/domain/entities/Match';

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
            <th>Heure</th>
            <th>Équipe Domicile</th>
            <th>Score</th>
            <th>Équipe Extérieur</th>
          </tr>
        </thead>
        <tbody>
          {matches.map(match => (
            <tr key={match.id}>
              <td>{new Date(match.date).toLocaleDateString()}</td>
              <td>{match.time.slice(0, 5)}</td>
              <td>
                <img src={match.homeTeam.logo} alt={match.homeTeam.name} style={{ width: '20px', marginRight: '8px' }} />
                {match.homeTeam.name}
              </td>
              <td>{match.homeScore} - {match.awayScore}</td>
              <td>
                <img src={match.awayTeam.logo} alt={match.awayTeam.name} style={{ width: '20px', marginRight: '8px' }} />
                {match.awayTeam.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatchTable;
