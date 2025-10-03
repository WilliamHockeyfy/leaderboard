import { useState, useEffect } from 'react';
import { leaderboardService } from '../services/leaderboardService';
import { LeaderboardUser } from '../models/LeaderboardUser';

/**
 * useLeaderboard hook
 * @returns {Object} The useLeaderboard hook
 */
export const useLeaderboard = () => {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [settingDatabase, setSettingDatabase] = useState(false);

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

  const setDatabaseToMockData = async () => {
    try {
      setSettingDatabase(true);
      setError(null);
      await leaderboardService.setDatabaseToMockData();

      await fetchUsers(); //refresh, maybe remove when liveupdates are implemented.
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to set database to mock data');
    } finally {
      setSettingDatabase(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    settingDatabase,
    refetch: fetchUsers,
    setDatabaseToMockData,
  };
};