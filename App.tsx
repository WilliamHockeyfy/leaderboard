import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import LeaderboardList from './src/components/Leaderboard/leaderboardList';

export default function App() {



    useEffect(() => {

    }, []);


    return (
        <View style={styles.container}>
        <Text style={styles.Title}>Leaderboard</Text>

        <LeaderboardList />


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    Title: {
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
});