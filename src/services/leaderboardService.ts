import {leaderboardRepository } from '../repositories/leaderboardRepository';
import { LeaderboardUser } from '../models/LeaderboardUser';

/**
 * LeaderboardService class
 * @class LeaderboardService
 * @method getAllUsers - Get all users from the leaderboard
 * @returns {Promise<LeaderboardUser[]>} All users in the leaderboard
 */
export class LeaderboardService {
  /**
   * Get all users from the leaderboard
   * @returns {Promise<LeaderboardUser[]>} All users in the leaderboard
   */
  async getAllUsers(): Promise<LeaderboardUser[]> {
    return await leaderboardRepository.getAll();
  }
}

export const leaderboardService = new LeaderboardService();
