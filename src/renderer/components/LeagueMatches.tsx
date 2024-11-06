// src/renderer/components/LeagueMatches.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css'; // Assurez-vous que le CSS est importé
import MatchTable from './MatchTable';

const LeagueMatches: React.FC = () => {
  const [matches, setMatches] = useState<any[]>([]);
  const [leagues, setLeagues] = useState<any[]>([]); // Liste des ligues
  const [selectedLeague, setSelectedLeague] = useState<number | null>(null); // Ligue sélectionnée
  const [selectedSeason, setSelectedSeason] = useState<string>('2024'); // Saison sélectionnée
  const [seasons, setSeasons] = useState<string[]>([]); // Saison(s) disponibles pour la ligue sélectionnée

  // Récupérer les ligues disponibles
  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const response = await axios.get('https://v1.rugby.api-sports.io/leagues', {
          headers: {
            'x-rapidapi-key': '7288bc3137ad52a99c9fe3715fde0e43',
            'x-rapidapi-host': 'v1.rugby.api-sports.io',
          }
        });
        setLeagues(response.data.response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLeagues();
  }, []);

  // Récupérer les matchs pour la ligue et la saison sélectionnées
  useEffect(() => {
    const fetchMatches = async () => {
      if (!selectedLeague) return;

      try {
        const response = await axios.get(`https://v1.rugby.api-sports.io/games`, {
          params: {
            league: selectedLeague,
            season: selectedSeason,
          },
          headers: {
            'x-rapidapi-key': '7288bc3137ad52a99c9fe3715fde0e43',
            'x-rapidapi-host': 'v1.rugby.api-sports.io',
          },
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
            date: `${formattedDate}, ${formattedTime}`,
            homeTeam: match.teams.home.name,
            awayTeam: match.teams.away.name,
            homeScore: match.scores.home,
            awayScore: match.scores.away,
            homeLogo: match.teams.home.logo,
            awayLogo: match.teams.away.logo,
            status: match.status.long,
          };
        }));
      } catch (error) {
        console.error(error);
      }
    };

    fetchMatches();
  }, [selectedLeague, selectedSeason]); // Recharger les matchs lorsque la ligue ou la saison change

  // Mettre à jour les saisons disponibles lors de la sélection d'une ligue
  useEffect(() => {
    if (selectedLeague !== null) {
      const league = leagues.find(league => league.id === selectedLeague);
      if (league) {
        // Trier les saisons dans l'ordre décroissant
        const sortedSeasons = league.seasons
          .map((season: any) => season.season)
          .sort((a, b) => parseInt(b) - parseInt(a)); // Tri décroissant

        setSeasons(sortedSeasons);
        setSelectedSeason(sortedSeasons[0]); // Définir la première saison comme valeur par défaut
      }
    }
  }, [selectedLeague, leagues]);

  return (
    <div className="container">
      <h2>Matchs de Rugby</h2>

      <div className="select-container">
        <label htmlFor="league-select">Sélectionner une ligue : </label>
        <select
          id="league-select"
          onChange={(e) => setSelectedLeague(Number(e.target.value))}
          value={selectedLeague ?? ''}
        >
          <option value="">-- Sélectionner une ligue --</option>
          {leagues.map((league) => (
            <option key={league.id} value={league.id}>
              {league.name}
            </option>
          ))}
        </select>
      </div>

      {selectedLeague && (
        <div className="select-container">
          <label htmlFor="season-select">Sélectionner une saison : </label>
          <select
            id="season-select"
            onChange={(e) => setSelectedSeason(e.target.value)}
            value={selectedSeason}
          >
            {seasons.map((season) => (
              <option key={season} value={season}>
                {season}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="table-container">
        <MatchTable matches={matches} />
      </div>
    </div>
  );
};

export default LeagueMatches;
