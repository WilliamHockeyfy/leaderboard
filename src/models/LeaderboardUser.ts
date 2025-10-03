/**
 * LeaderboardUser interface, represents a user in the leaderboard, duh. 
 * @interface LeaderboardUser
 * @property {string} id - The id of the user
 * @property {string} username - The username of the user
 * @property {number} score - The score of the user
 * @property {number} avatar - The avatar of the user
 */
export interface LeaderboardUser {
    id: string;
    username: string;
    score: number;
    avatar?: number;
  }