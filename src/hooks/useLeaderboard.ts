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

  /* deprecated with the implementation of subscribeToLeaderboard
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedUsers = await leaderboardService.getAllUsers();
      setUsers(fetchedUsers);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch leaderboard users');
    } finally {
      setLoading(false);
    }
  };
*/
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
   */
  const setDatabaseToMockData = async () => {
    try {
      setSettingDatabase(true);
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
  };
};
