// src/data/repositories/MatchRepository.ts
import { RugbyApi } from '../api/rugbyApi';
import { Match } from '../../core/domain/entities/Match';

export class MatchRepository {
  private rugbyApi: RugbyApi;

  constructor() {
    this.rugbyApi = new RugbyApi();
  }

  async fetchLeagueMatches(): Promise<Match[]> {
    const matchDataList = await this.rugbyApi.getMatches(16, '2024');

    return matchDataList.map((matchData: any) => ({
      id: matchData.id,
      date: matchData.date,
      time: matchData.time,
      homeTeam: {
        id: matchData.teams.home.id,
        name: matchData.teams.home.name,
        logo: matchData.teams.home.logo,
      },
      awayTeam: {
        id: matchData.teams.away.id,
        name: matchData.teams.away.name,
        logo: matchData.teams.away.logo,
      },
      homeScore: matchData.scores.home,
      awayScore: matchData.scores.away,
      week: matchData.week,
    }));
  }
}
