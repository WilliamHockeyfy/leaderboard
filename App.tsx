import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

export default function App() {
    const [isConnected, setIsConnected] = useState<boolean | null>(null);
    const [leaderboardDoc, setLeaderboardDoc] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkFirebaseConnection();
        fetchLeaderboardDoc();
    }, []);

    const checkFirebaseConnection = async () => {
        try {
            const apps = firebase.apps;
            if (apps.length > 0) {
                setIsConnected(true);
            } else {
                setIsConnected(false);
            }
        } catch (error) {
            console.error('Firebase connection error:', error);
            setIsConnected(false);
        }
    };

    const fetchLeaderboardDoc = async () => {
        try {
            const snapshot = await firestore()
                .collection('leaderboard')
                .limit(1)
                .get();

            if (!snapshot.empty) {
                const doc = snapshot.docs[0];
                setLeaderboardDoc({ id: doc.id, ...doc.data() });
            }
        } catch (error) {
            console.error('Error fetching leaderboard:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                    <Text style={styles.title}>Firebase Connection Status</Text>
                    <Text style={isConnected ? styles.connected : styles.disconnected}>
                        {isConnected ? '✓ Connected to Firebase' : '✗ Not Connected'}
                    </Text>

                    {leaderboardDoc && (
                        <View style={styles.docContainer}>
                            <Text style={styles.docTitle}>Leaderboard Document:</Text>
                            <Text style={styles.docText}>ID: {leaderboardDoc.id}</Text>
                            <Text style={styles.docText}>
                                Data: {JSON.stringify(leaderboardDoc, null, 2)}
                            </Text>
                        </View>
                    )}
                </>
            )}
            <StatusBar style="auto" />
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    connected: {
        fontSize: 18,
        color: 'green',
        fontWeight: '600',
    },
    disconnected: {
        fontSize: 18,
        color: 'red',
        fontWeight: '600',
    },
    info: {
        fontSize: 14,
        color: '#666',
        marginTop: 10,
    },
    docContainer: {
        marginTop: 20,
        padding: 15,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        width: '100%',
    },
    docTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    docText: {
        fontSize: 14,
        color: '#333',
        marginBottom: 5,
    },
});