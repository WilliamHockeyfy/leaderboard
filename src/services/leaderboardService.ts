import { leaderboardRepository } from "../repositories/leaderboardRepository";
import { LeaderboardUser } from "../models/LeaderboardUser";

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
  /* deprecated with the implementation of subscribeToLeaderboard
  async getAllUsers(): Promise<LeaderboardUser[]> {
    return await leaderboardRepository.getAll();
  }
  */

  /**
   * Subscribe to leaderboard database.
   * @param {LeaderboardUser[]} users - The users
   * @param {Error} error - potential error.
   * @returns {() => void} - The unsubscribe function.
   */
  subscribeToLeaderboard(
    callback: (users: LeaderboardUser[]) => void,
    onError?: (error: Error) => void,
  ): () => void {
    return leaderboardRepository.subscribeToLeaderboard(callback, onError);
  }

  /**
   * Hard sets the database to mock data.
   * @returns {Promise<void>} Promise that resolves when database is set
   */
  async setDatabaseToMockData(): Promise<void> {
    return await leaderboardRepository.setDatabase();
  }
}

/**
 * Singleton instance of LeaderboardService for business logic operations
 * @type {LeaderboardService}
 */
export const leaderboardService = new LeaderboardService();
