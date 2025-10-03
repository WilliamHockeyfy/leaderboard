import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import LeaderboardTile from "./leaderboardTile";
import { LeaderboardUser } from "../../models/LeaderboardUser";

/**
 * LeaderboardListProps interface
 * @interface LeaderboardListProps
 * @property {LeaderboardUser[]} users - The users to display in the leaderboard
 */
interface LeaderboardListProps {
    users: LeaderboardUser[];
}

/**
 * LeaderboardList component
 * @param {LeaderboardListProps} props - The props for the LeaderboardList component
 * @param {LeaderboardUser[]} props.users - The users to display in the leaderboard
 * @returns {JSX.Element} The LeaderboardList component
 */
export default function LeaderboardList({ users = [] }: LeaderboardListProps) {
    const hasUsers = users.length > 0;

    return (
        <ScrollView style={styles.container}>
            {hasUsers ? (
                users.map((user, index) => (
                    <LeaderboardTile
                        key={user.id}
                        score={user.score}
                        name={user.username}
                        avatar={user.avatar}
                        ranking={index + 1}
                    />
                ))
            ) : (
                <Text style={styles.errorText}>No users found</Text>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        maxWidth: "100%",
        minWidth: "80%",
        maxHeight: "80%",
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 10,
        flexDirection: "column",
        padding: 10,
        margin: 5,
    },
    errorText: {
        color: "red",
        alignSelf: "center",
        fontSize: 18,
    },
});
