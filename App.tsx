import { StatusBar } from 'expo-status-bar';
import { Button, GestureResponderEvent, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, {useEffect, useState } from 'react';
import APIHelper from './src/APIHelper';
import SignUpScreen from './src/screens/SignUpScreen';
import SignInScreen from './src/screens/SignInScreen';

export default function App() {
  const [gratitudeEntries, setGratitudeEntries] = useState<GratitudeEntryResponse[]>([])
  const [entryText, setEntryText] = useState('')

  useEffect(() => {
    const fetchAndSetGratitudeEntries = async () => {
      const entries = await APIHelper.getAllGratitudeEntries()
      setGratitudeEntries(entries)
    }
    fetchAndSetGratitudeEntries()
  }, [])

  const createEntry = async (event: GestureResponderEvent) => {
    // event.preventDefault()
    
    if(!entryText) {
      alert('Please enter something')
      return
    }

    const newEntry = await APIHelper.createGratitudeEntry({gratitudeDescription: entryText})
    setGratitudeEntries([...gratitudeEntries, newEntry])
  
    setEntryText('')
  }

  const deleteEntry = async (event: GestureResponderEvent, id: string) => {
    // event.stopPropagation()
    try {
      await APIHelper.deleteGratitudeEntry(id)
      setGratitudeEntries(gratitudeEntries.filter(entry => entry._id !== id))
    } catch (err) {

    }
  }

  return (
    <ScrollView style={styles.container}>
      <SignUpScreen />
      <SignInScreen />
      <View style={styles.inputAndButtonContainer}>
        <TextInput onChangeText={newText=> setEntryText(newText)} placeholder="What are you thankful for today?" style={styles.input} value={entryText}></TextInput>
        <Button onPress={createEntry} title="Add" />
      </View>
      {gratitudeEntries.map((entry) => {
        return (
          <View key={entry._id} style={styles.entryTextAndButtonContainer}>
            <Text>- {entry.gratitudeDescription}</Text>
            <Pressable onPress={(event) => deleteEntry(event, entry._id)} style={styles.deleteButton}><Text style={styles.deleteButtonText}>x</Text></Pressable>
          </View>
        )
      })}
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    // justifyContent: 'center',
    padding: 32,
  },
  deleteButton: {
    paddingHorizontal: 8,
  },
  deleteButtonText: {
    color: 'blue'
  },
  entryTextAndButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8
  },
  input: {
    borderColor: 'gray',
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
  },
  inputAndButtonContainer: {
    flexDirection: 'row'
  },
});

interface GratitudeEntryResponse {
  _id: string,
  favorited: boolean,
  gratitudeDescription: string,
}
