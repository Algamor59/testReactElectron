// src/presentation/components/Top14Matches.tsx
import React, { useEffect, useState } from 'react';
import { FetchTop14MatchesUseCase } from '../../core/domain/useCases/FetchTop14MatchesUseCase';
import { MatchRepository } from '../../data/repositories/MatchRepository';
import { Match } from '../../core/domain/entities/Match';
import MatchTable from './MatchTable';

const Top14Matches: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const fetchMatchesUseCase = new FetchTop14MatchesUseCase(new MatchRepository());

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

export default Top14Matches;
