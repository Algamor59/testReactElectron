// src/core/domain/useCases/FetchLeagueMatchesUseCase.ts
import { Match } from '../entities/Match';
import { MatchRepository } from '../../../data/repositories/MatchRepository';

export class FetchLeagueMatchesUseCase {
  constructor(private matchRepository: MatchRepository) {}

  async execute(): Promise<Match[]> {
    return await this.matchRepository.fetchLeagueMatches();
  }
}
