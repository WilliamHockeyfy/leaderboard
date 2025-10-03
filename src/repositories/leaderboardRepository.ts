import firestore from '@react-native-firebase/firestore';
import { LeaderboardUser } from '../models/LeaderboardUser';

/**
 * LeaderboardRepository class, resposible for direct communcation with the database.
 * @class LeaderboardRepository
 * @method getAll - Get all users from the leaderboard
 * @returns {Promise<LeaderboardUser[]>} All users in the leaderboard
 */
export class LeaderboardRepository {
  private collection = firestore().collection('leaderboard');

  /**
   * Get all users from the leaderboard
   * @returns {Promise<LeaderboardUser[]>} All users in the leaderboard
   */
  async getAll(): Promise<LeaderboardUser[]> {
    try {
      const snapshot = await this.collection
        .orderBy('score', 'desc')
        .get();

      return snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
      })) as LeaderboardUser[];
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      throw new Error('Failed to fetch leaderboard data');
    }
  }

}

export const leaderboardRepository = new LeaderboardRepository();
