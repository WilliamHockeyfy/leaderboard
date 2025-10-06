import { leaderboardRepository } from "../repositories/leaderboardRepository";
import { LeaderboardUser } from "../models/LeaderboardUser";

/**
 * LeaderboardService class
 * @class LeaderboardService
 * @method setDatabaseToMockData - Set the database to mock data for debugging
 */
export class LeaderboardService {
  /**
   * Subscribe to leaderboard database.
   * @returns {() => void} - The unsubscribe function.
   * @param callback - callback with the users.
   * @param onError - error details.
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
    try {
      return await leaderboardRepository.setDatabase();
    } catch (error) {
      throw error;
    }
  }

  /**
   * Deletes a user from the leaderboard.
   * @param {string} id - The id of the user to delete.
   * @returns {Promise<void>} Promise that resolves when user is deleted.
   */
  async deleteUser(id: string): Promise<void> {
    console.log("Deleting user in service:", id);
    try {
      return await leaderboardRepository.deleteUser(id);
    } catch (error) {
      throw error;
    }
  }
}

/**
 * Singleton instance of LeaderboardService for business logic operations
 * @type {LeaderboardService}
 */
export const leaderboardService: LeaderboardService = new LeaderboardService();
