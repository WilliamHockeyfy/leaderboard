import { useState, useEffect, useCallback } from "react";
import { leaderboardService } from "../services/leaderboardService";
import { LeaderboardUser } from "../models/LeaderboardUser";

/**
 * useLeaderboard hook
 * @returns {Object} The useLeaderboard hook
 */
export const useLeaderboard = () => {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [settingDatabase, setSettingDatabase] = useState(false);

  /**
   * Handle realtime update
   * @param {LeaderboardUser[]} updatedUsers - The most recent users.
   */
  const handleRealtimeUpdate = useCallback(
    (updatedUsers: LeaderboardUser[]) => {
      setUsers(updatedUsers);
      setLoading(false);
      setError(null);
    },
    [],
  );

  /**
   * Handle error, sets error state and loading state to false.
   * @param {Error} error - The error
   */
  const handleError = useCallback((error: Error) => {
    setError(error.message);
    setLoading(false);
  }, []);

  /**
   * hard sets database to mock data.
   * @returns {Promise<void>} Promise that resolves when database is set to mock data.
   */
  const setDatabaseToMockData = async () => {
    try {
      setSettingDatabase(true);
      setLoading(true);
      setError(null);
      await leaderboardService.setDatabaseToMockData();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to set database to mock data",
      );
    } finally {
      setSettingDatabase(false);
    }
  };

  /**
   * Deletes a user from the leaderboard.
   * @param {string} id - The id of the user to delete.
   * @returns {Promise<void>} Promise that resolves when user is deleted.
   */
  const onDeleteUser = useCallback(
    async (id: string) => {
      console.log("Deleting user in hook:", id);
      try {
        await leaderboardService.deleteUser(id);
      } catch (error) {
        handleError(
          error instanceof Error ? error : new Error("Failed to delete user"),
        );
      }
    },
    [handleError],
  );

  useEffect(() => {
    setLoading(true);
    /**
     * Subscribes to leaderboard.
     * @param {LeaderboardUser[]} updatedUsers - The most recent users.
     * @param {Error} error - The error
     */
    const unsubscribe = leaderboardService.subscribeToLeaderboard(
      handleRealtimeUpdate,
      handleError,
    );

    return () => {
      unsubscribe();
    };
  }, [handleRealtimeUpdate, handleError]);

  return {
    users,
    loading,
    error,
    settingDatabase,
    setDatabaseToMockData,
    onDeleteUser,
  };
};
