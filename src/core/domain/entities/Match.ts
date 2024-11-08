// src/core/domain/entities/Match.ts
export interface Team {
  id: number;
  name: string;
  logo: string;
}

export interface Match {
  id: number;
  date: string;
  time: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  week: number;
}
