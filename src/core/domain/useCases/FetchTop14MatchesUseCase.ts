// src/core/domain/useCases/FetchTop14MatchesUseCase.ts
import { Match } from '../entities/Match';
import { MatchRepository } from '../../../data/repositories/MatchRepository';

export class FetchTop14MatchesUseCase {
  constructor(private matchRepository: MatchRepository) {}

  async execute(): Promise<Match[]> {
    return await this.matchRepository.fetchTop14Matches();
  }
}
