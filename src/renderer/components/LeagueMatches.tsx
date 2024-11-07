// src/renderer/components/LeagueMatches.tsx
import React, { useEffect, useState } from 'react';
import '../App.css';
import MatchTable from './MatchTable';
import { RugbyApi } from '../../data/api/rugbyApi';

// eslint-disable-next-line react/function-component-definition
const LeagueMatches: React.FC = () => {
  const [matches, setMatches] = useState<any[]>([]);
  const [leagues, setLeagues] = useState<any[]>([]);
  const [selectedLeague, setSelectedLeague] = useState<number | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<string>('2024');
  const [seasons, setSeasons] = useState<string[]>([]);
  const rugbyApi = new RugbyApi();

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const leaguesData = await rugbyApi.getLeagues();
        setLeagues(leaguesData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLeagues();
  }, []);

  useEffect(() => {
    const fetchMatches = async () => {
      if (!selectedLeague) return;

      try {
        const matchesData = await rugbyApi.getMatches(selectedLeague, selectedSeason);
        setMatches(matchesData.map((match: any) => {
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
  }, [selectedLeague, selectedSeason]);

  useEffect(() => {
    if (selectedLeague !== null) {
      const league = leagues.find(league => league.id === selectedLeague);
      if (league) {
        const sortedSeasons = league.seasons
          .map((season: any) => season.season)
          .sort((a, b) => parseInt(b) - parseInt(a));
        setSeasons(sortedSeasons);
        setSelectedSeason(sortedSeasons[0]);
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
        {/* Transmettre la prop `leagueSelected` */}
        <MatchTable matches={matches} leagueSelected={selectedLeague !== null} />
      </div>
    </div>
  );
};

export default LeagueMatches;
