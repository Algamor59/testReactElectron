// src/data/api/rugbyApi.ts
import axios from 'axios';
import { config } from '../../config/config';

export class RugbyApi {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    this.baseUrl = config.api.baseUrl;
    this.apiKey = config.api.apiKey;
  }

  async getMatches(leagueId: number, season: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/games`, {
        headers: {
          'x-rapidapi-key': this.apiKey,
          'x-rapidapi-host': 'v1.rugby.api-sports.io',
        },
        params: {
          league: leagueId,
          season: season,
        },
      });
      return response.data.response;
    } catch (error) {
      console.error('Error fetching matches:', error);
      throw error;
    }
  }
}
