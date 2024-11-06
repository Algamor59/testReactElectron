// src/renderer/components/Top14Matches.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import MatchTable from './MatchTable';

const Top14Matches: React.FC = () => {
  const [matches, setMatches] = useState<any[]>([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get('https://v1.rugby.api-sports.io/games?league=16&season=2024', {
          headers: {
            'x-rapidapi-key': '7288bc3137ad52a99c9fe3715fde0e43',
            'x-rapidapi-host': 'v1.rugby.api-sports.io'
          }
        });
        setMatches(response.data.response.map((match: any) => {
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
            id: match.id,
            date: `${formattedDate}, ${formattedTime}`, // Date formatée
            homeTeam: match.teams.home.name,
            awayTeam: match.teams.away.name,
            homeScore: match.scores.home,
            awayScore: match.scores.away,
            homeLogo: match.teams.home.logo,
            awayLogo: match.teams.away.logo,
          };
        }));
      } catch (error) {
        console.error(error);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div>
      <h2>Matchs du Top 14</h2>
      <MatchTable matches={matches} />
    </div>
  );
};

export default Top14Matches;
