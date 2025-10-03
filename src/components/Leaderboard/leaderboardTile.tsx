import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

/**
 * LeaderboardTileProps interface
 * @interface LeaderboardTileProps
 * @property {number} score - The score of the user
 * @property {string} name - The name of the user
 * @property {number} avatar - The avatar of the user
 * @property {number} ranking - The ranking of the user
 */
interface LeaderboardTileProps {
  score: number;
  name: string;
  avatar?: number; // Number seed for dicebear avatars now. Uses seed instead of ID and can basically go infinitely.
  ranking?: number;
}

/**
 * LeaderboardTile component
 * @param {LeaderboardTileProps} props - The props for the LeaderboardTile component
 * @param {number} props.score - The score of the user
 * @param {string} props.name - The name of the user
 * @param {number} props.avatar - The avatar of the user
 * @param {number} props.ranking - The ranking of the user
 * @returns {JSX.Element} The LeaderboardTile component
 */
export default function LeaderboardTile(props: LeaderboardTileProps) {
  const { score = 100, name = "John Doe", avatar = 1, ranking = 1 } = props;

  return (
    <View style={styles.container}>
      <View style={styles.rankingContainer}>
        <Text style={styles.text}>{ranking}</Text>
      </View>

      <View style={styles.AvatarContainer}>
        <Image
          // Uses DiceBear API with seed-based avatar generation for scalable avatar system
          source={{
            uri: `https://api.dicebear.com/7.x/pixel-art/png?seed=${avatar}`,
          }}
          style={styles.avatarImage}
          resizeMode="cover"
        />
      </View>

      <View style={styles.nameContainer}>
        <Text style={[styles.text, styles.nameText]} numberOfLines={1}>
          {name}
        </Text>
      </View>

      <View style={styles.scoreContainer}>
        <Text style={styles.text} numberOfLines={1}>
          {score}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 50,
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333333",
  },
  rankingContainer: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "grey",
    borderRadius: 25,
  },
  AvatarContainer: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    marginLeft: 5,
    borderColor: "black",
    borderRadius: 25,
  },
  nameContainer: {
    maxWidth: "40%",
    height: 50,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 5,
  },
  nameText: {
    textDecorationLine: "underline",
    textDecorationColor: "black",
    fontStyle: "italic",
  },
  scoreContainer: {
    width: "20%",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
    margin: 5,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 25,
  },
});
