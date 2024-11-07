import React, { useState } from 'react';
import '../App.css';

interface Match {
  id: number;
  date: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  homeLogo: string;
  awayLogo: string;
  status: string;
}

interface MatchTableProps {
  matches: Match[];
  leagueSelected: boolean;
}

const MatchTable: React.FC<MatchTableProps> = ({ matches, leagueSelected }) => {
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: 'date',  // Default sorting by date
    direction: 'asc',
  });

  const sortMatches = (matches: Match[]) => {
    const sortedMatches = [...matches];
    const { key, direction } = sortConfig;

    sortedMatches.sort((a, b) => {
      if (key === 'date') {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return direction === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
      }
      if (key === 'homeTeam' || key === 'awayTeam') {
        const teamA = a[key as keyof Match].toLowerCase();
        const teamB = b[key as keyof Match].toLowerCase();
        return direction === 'asc' ? teamA.localeCompare(teamB) : teamB.localeCompare(teamA);
      }
      if (key === 'status') {
        const statusA = a.status.toLowerCase();
        const statusB = b.status.toLowerCase();
        return direction === 'asc' ? statusA.localeCompare(statusB) : statusB.localeCompare(statusA);
      }
      return 0;
    });

    return sortedMatches;
  };

  const handleSort = (column: string) => {
    setSortConfig((prevState) => {
      if (prevState.key === column) {
        return { key: column, direction: prevState.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key: column, direction: 'asc' };
    });
  };

  const sortedMatches = sortMatches(matches);

  return (
    <div className="table-container">
      <table>
        {leagueSelected && (
          <thead>
            <tr>
              <th
                onClick={() => handleSort('date')}
                className={sortConfig.key === 'date' ? (sortConfig.direction === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''}
              >
                Date
                <span className={`arrow ${sortConfig.key === 'date' ? (sortConfig.direction === 'asc' ? 'arrow-up' : 'arrow-down') : 'arrow-up'}`} />
              </th>
              <th
                onClick={() => handleSort('homeTeam')}
                className={sortConfig.key === 'homeTeam' ? (sortConfig.direction === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''}
              >
                Équipe Domicile
                <span className={`arrow ${sortConfig.key === 'homeTeam' ? (sortConfig.direction === 'asc' ? 'arrow-up' : 'arrow-down') : 'arrow-up'}`} />
              </th>
              <th>Score</th>
              <th>Score</th>
              <th
                onClick={() => handleSort('awayTeam')}
                className={sortConfig.key === 'awayTeam' ? (sortConfig.direction === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''}
              >
                Équipe Extérieure
                <span className={`arrow ${sortConfig.key === 'awayTeam' ? (sortConfig.direction === 'asc' ? 'arrow-up' : 'arrow-down') : 'arrow-up'}`} />
              </th>
              <th
                onClick={() => handleSort('status')}
                className={sortConfig.key === 'status' ? (sortConfig.direction === 'asc' ? 'sorted-asc' : 'sorted-desc') : ''}
              >
                Statut
                <span className={`arrow ${sortConfig.key === 'status' ? (sortConfig.direction === 'asc' ? 'arrow-up' : 'arrow-down') : 'arrow-up'}`} />
              </th>
            </tr>
          </thead>
        )}
        <tbody>
          {sortedMatches.map((match) => (
            <tr key={match.id}>
              <td>{match.date}</td>
              <td>
                <img
                  src={match.homeLogo}
                  alt={match.homeTeam}
                  style={{ width: '40px', height: 'auto', marginRight: '10px' }}
                />
                {match.homeTeam}
              </td>
              <td>
                <div className={`score ${match.homeScore > match.awayScore ? 'winner' : match.homeScore < match.awayScore ? 'loser' : 'draw'}`}>
                  {match.homeScore}
                </div>
              </td>
              <td>
                <div className={`score ${match.awayScore > match.homeScore ? 'winner' : match.awayScore < match.homeScore ? 'loser' : 'draw'}`}>
                  {match.awayScore}
                </div>
              </td>
              <td>
                <img
                  src={match.awayLogo}
                  alt={match.awayTeam}
                  style={{ width: '40px', height: 'auto', marginRight: '10px' }}
                />
                {match.awayTeam}
              </td>
              <td>{match.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatchTable;
