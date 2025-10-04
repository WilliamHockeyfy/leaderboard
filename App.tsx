import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import LeaderboardList from "./src/components/Leaderboard/leaderboardList";
import DebugMenu from "./src/components/DebugMenu/DebugMenu";
import { useLeaderboard } from "./src/hooks/useLeaderboard";
import React, { JSX } from "react";
import { Ionicons } from "@expo/vector-icons";

/**
 * App component, shows the leaderboard.
 * @returns {JSX.Element} The App component
 */
export default function App(): JSX.Element {
  const { users, loading, error, setDatabaseToMockData } = useLeaderboard();

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.Title}>Leaderboard</Text>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.Title}>Leaderboard</Text>
        <Text style={styles.errorText}>Error: {error}</Text>
        <DebugMenu setDatabaseToMockData={setDatabaseToMockData} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.Title}>Leaderboard</Text>
      <LeaderboardList users={users} />

      <DebugMenu
        // connects the setMockdata function in the hook to the debugmenu button.
        setDatabaseToMockData={setDatabaseToMockData}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    width: "100%",
  },
  Title: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
  },
  errorText: {
    color: "#ff0000",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  retryText: {
    color: "#0000ff",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    textDecorationLine: "underline",
  },
});
