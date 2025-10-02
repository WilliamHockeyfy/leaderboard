import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import firebase from '@react-native-firebase/app';

export default function App() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);

  useEffect(() => {
    checkFirebaseConnection();
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

  return (
    <View style={styles.container}>
      {isConnected === null ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Text style={styles.title}>Firebase Connection Status</Text>
          <Text style={isConnected ? styles.connected : styles.disconnected}>
            {isConnected ? '✓ Connected to Firebase' : '✗ Not Connected'}
          </Text>
          {isConnected && (
            <Text style={styles.info}>
              App: {firebase.app().name}
            </Text>
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
});
