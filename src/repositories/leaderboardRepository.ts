import firestore from "@react-native-firebase/firestore";
import { LeaderboardUser } from "../models/LeaderboardUser";
import mockData from "../../assets/data/MOCK_DATA.json"; // Mock data generated using "https://www.mockaroo.com/"

/**
 * LeaderboardRepository class, responsible for direct communication with the database.
 * @class LeaderboardRepository
 * @returns {Promise<LeaderboardUser[]>} All users in the leaderboard
 */
export class LeaderboardRepository {
  private collection = firestore().collection("leaderboard");

  /**
   * Subscribes to leaderboard database.
   * @returns {() => void} - The unsubscribe function.
   * @param callback - callback for the users.
   * @param onError - potential error
   */
  subscribeToLeaderboard(
    callback: (users: LeaderboardUser[]) => void,
    onError?: (error: Error) => void,
  ): () => void {
    let q = this.collection.orderBy("score", "desc");
    q = q.limit(30);

    return q.onSnapshot(
      (snapshot) => {
        const users = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as LeaderboardUser[];

        callback(users);
      },
      (error) => {
        console.error("Error for leaderboard listener:", error);
        const firebaseError = new Error(
          "Failed to listen to leaderboard updates",
        );
        if (onError) {
          onError(firebaseError);
        }
      },
    );
  }

  /**
   * Hard sets the database to the mock data by clearing existing data and adding mock data.
   * for debugging purposes.
   * @returns {Promise<void>} Promise that resolves when database is set
   */
  async setDatabase(): Promise<void> {
    try {
      const snapshot = await this.collection.get();
      const batch = firestore().batch();
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();

      // cast mock data to LeaderboardUser format
      const leaderboardUsers: LeaderboardUser[] = Object.entries(mockData).map(
        ([id, userData]) => ({
          id,
          username: userData.username,
          score: userData.score,
          avatar: userData.avatar,
        }),
      );

      // Add mock data to database
      const addBatch = firestore().batch();
      leaderboardUsers.forEach((user) => {
        const docRef = this.collection.doc(user.id);
        addBatch.set(docRef, {
          username: user.username,
          score: user.score,
          avatar: user.avatar,
        });
      });

      await addBatch.commit();
      console.log("Database set to mock data successfully");
    } catch (error) {
      console.error("Error setting database to mock data:", error);
      throw new Error("Failed to set database to mock data");
    }
  }
}

/**
 * Singleton instance of LeaderboardRepository for database operations
 * @type {LeaderboardRepository}
 */
export const leaderboardRepository = new LeaderboardRepository();
