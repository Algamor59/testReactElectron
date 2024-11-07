import React, { useEffect, useState } from 'react';
import { RugbyApi } from '../../data/api/rugbyApi';

interface UpcomingMatch {
  date: string;
  homeTeam: string;
  awayTeam: string;
  homeLogo: string;
  awayLogo: string;
}

const UpcomingMatches: React.FC = () => {
  const [matches, setMatches] = useState<UpcomingMatch[]>([]);
  const rugbyApi = new RugbyApi();

  useEffect(() => {
    const fetchUpcomingMatches = async () => {
      try {
        const matchesData = await rugbyApi.getMatches(16, '2024'); // Top 14, saison 2024
        const upcomingMatches = matchesData.slice(0, 10).map((match: any) => {
          const dateObj = new Date(match.date);
          const formattedDate = dateObj.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
          const formattedTime = dateObj.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
          });

          return {
            date: `${formattedDate} à ${formattedTime}`,
            homeTeam: match.teams.home.name,
            awayTeam: match.teams.away.name,
            homeLogo: match.teams.home.logo,
            awayLogo: match.teams.away.logo,
          };
        });
        setMatches(upcomingMatches);
      } catch (error) {
        console.error('Error fetching upcoming matches:', error);
      }
    };

    fetchUpcomingMatches();
  }, []);

  return (
    <div className="upcoming-matches">
      <h3>Prochains matchs du Top 14</h3>
      <ul className="match-list">
        {matches.map((match, index) => (
          <li key={index} className="match-item">
            <div className="match-info">
              <div className="match-date">{match.date}</div>
              <div className="teams">
                <div className="team">
                  <img src={match.homeLogo} alt={match.homeTeam} className="team-logo" />
                  <span className="team-name">{match.homeTeam}</span>
                </div>
                <span className="vs">VS</span>
                <div className="team">
                  <img src={match.awayLogo} alt={match.awayTeam} className="team-logo" />
                  <span className="team-name">{match.awayTeam}</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingMatches;
