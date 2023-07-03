import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import {useEffect, useState } from 'react';
import APIHelper from './APIHelper';

export default function App() {
  const [gratitudeEntries, setGratitudeEntries] = useState<GratitudeEntryResponse[]>([])

  useEffect(() => {
    const fetchAndSetGratitudeEntries = async () => {
      const entries = await APIHelper.getAllGratitudeEntries()
      setGratitudeEntries(entries)
    }
    fetchAndSetGratitudeEntries()
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.inputAndButtonContainer}>
        <TextInput placeholder="What are you thankful for today?" style={styles.input}></TextInput>
        <Button title="Add" />
      </View>
      {gratitudeEntries.map((entry) => {
        return <Text key={entry._id} style={styles.entryText}>- {entry.gratitudeDescription}</Text>
      })}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    padding: 32,
  },
  entryText: {
    paddingTop: 8,
  },
  input: {
    borderColor: 'gray',
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    height: 40,
    padding: 8,
  },
  inputAndButtonContainer: {
    flexDirection: 'row'
  }
});

interface GratitudeEntryResponse {
  _id: string,
  favorited: boolean,
  gratitudeDescription: string,
}
