// src/presentation/components/LeagueMatches.tsx
import React, { useEffect, useState } from 'react';
import { FetchLeagueMatchesUseCase } from '../../core/domain/useCases/FetchLeagueMatchesUseCase';
import { MatchRepository } from '../../data/repositories/MatchRepository';
import { Match } from '../../core/domain/entities/Match';
import MatchTable from './MatchTable';

const LeagueMatches: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const fetchMatchesUseCase = new FetchLeagueMatchesUseCase(new MatchRepository());

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMatchesUseCase.execute();
      setMatches(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Matchs du Top 14</h2>
      <MatchTable matches={matches} />
    </div>
  );
};

export default LeagueMatches;
