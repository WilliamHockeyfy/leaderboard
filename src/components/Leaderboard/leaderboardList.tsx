import React, { JSX, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import LeaderboardTile from "./leaderboardTile";
import { LeaderboardUser } from "../../models/LeaderboardUser";
import LinearGradient from "react-native-linear-gradient";

/**
 * LeaderboardListProps interface
 * @interface LeaderboardListProps
 * @property {LeaderboardUser[]} users - The users to display in the leaderboard
 */
interface LeaderboardListProps {
  users: LeaderboardUser[];
  onDeleteUser: (id: string) => void;
}

/**
 * LeaderboardList component
 * @param {LeaderboardListProps} props - The props for the LeaderboardList component
 * @param {LeaderboardUser[]} props.users - The users to display in the leaderboard
 * @returns {JSX.Element} The LeaderboardList component
 */
export default function LeaderboardList({
  users = [],
  onDeleteUser,
}: LeaderboardListProps): JSX.Element {
  const hasUsers = users.length > 0;
  const [anyMenuOpen, setAnyMenuOpen] = useState(false);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(255,255,255,1)", "rgba(255,255,255,0)"]}
        style={[styles.fade, { top: 0, height: 10 }]}
        pointerEvents="none"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {hasUsers ? (
          users.map((user, index) => (
            <LeaderboardTile
              key={user.id}
              score={user.score}
              name={user.username}
              avatar={user.avatar}
              ranking={index + 1}
              id={user.id}
              onDeleteUser={onDeleteUser}
              setAnyMenuOpen={setAnyMenuOpen}
              anyMenuOpen={anyMenuOpen}
            />
          ))
        ) : (
          <Text style={styles.errorText}>No users found</Text>
        )}
      </ScrollView>

      <LinearGradient
        colors={["rgba(255,255,255,0)", "rgba(255,255,255,1)"]}
        style={[styles.fade, { bottom: 0, height: 10 }]}
        pointerEvents="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: "100%",
    minWidth: "90%",
    maxHeight: "80%",

    flexDirection: "column",
    margin: 5,
  },

  fade: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 1,
  },

  errorText: {
    color: "red",
    alignSelf: "center",
    fontSize: 18,
  },
});
