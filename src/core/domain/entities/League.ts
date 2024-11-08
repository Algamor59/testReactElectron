export interface Season {
  season: string;
  startDate: string;
  endDate: string;
}

export interface League {
  id: number;
  name: string;
  seasons: Season[];
}
