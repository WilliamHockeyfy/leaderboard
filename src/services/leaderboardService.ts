import {leaderboardRepository } from '../repositories/leaderboardRepository';
import { LeaderboardUser } from '../models/LeaderboardUser';

/**
 * LeaderboardService class
 * @class LeaderboardService
 * @method getAllUsers - Get all users from the leaderboard
 * @method setDatabaseToMockData - Set the database to mock data for debugging
 */
export class LeaderboardService {
  /**
   * Get all users from the leaderboard
   * @returns {Promise<LeaderboardUser[]>} All users in the leaderboard
   */
  async getAllUsers(): Promise<LeaderboardUser[]> {
    return await leaderboardRepository.getAll();
  }

  /**
   * Hard sets the database to mock data.
   * @returns {Promise<void>} Promise that resolves when database is set
   */
  async setDatabaseToMockData(): Promise<void> {
    return await leaderboardRepository.setDatabase();
  }
}

export const leaderboardService = new LeaderboardService();
