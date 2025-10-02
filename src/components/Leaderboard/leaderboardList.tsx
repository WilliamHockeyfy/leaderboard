import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import LeaderboardTile from './leaderboardTile';

interface LeaderboardListProps {
}

export default function LeaderboardList({}: LeaderboardListProps) {
    return (
        <ScrollView style={styles.container}>
 
        {Array.from({ length: 10 }, (_, i) => (
          <LeaderboardTile 
            key={i}
            score={1000 - (i*10)}
            name={`Player ${i + 1}`}
            avatar={i + 1}
            ranking={i + 1}
          />
        ))}
        

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {

      maxWidth: '100%',
      maxHeight: '80%',
      borderWidth: 2,
      borderColor: 'black',
      borderRadius: 10,


      flexDirection: 'column',
      padding: 10,
      margin: 5,
    },
});