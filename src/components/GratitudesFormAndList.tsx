import React, { useEffect, useRef, useState } from 'react';
import {  Button, GestureResponderEvent, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import APIHelper from '../api/APIHelper';
import { useUser } from '@realm/react';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated'

const GratitudesFormAndList = () => {
  const user = useUser();

  const [gratitudeEntries, setGratitudeEntries] = useState<GratitudeEntryResponse[]>([])
  const [entryText, setEntryText] = useState('')

  useEffect(() => {
    if (!user || !user.id) {
      return
    }

    const fetchAndSetGratitudeEntries = async () => {
      const entries = await APIHelper.getAllGratitudeEntries(user.id)
      setGratitudeEntries(entries)
    }
    fetchAndSetGratitudeEntries()
  }, [user])

  const createEntry = async (event: GestureResponderEvent) => {
    // event.preventDefault()

    if(!user || !user.id) {
      alert('Something went wrong.')
      return
    }
    
    if(!entryText) {
      alert('Please enter something')
      return
    }

    const newEntry = await APIHelper.createGratitudeEntry({gratitudeDescription: entryText, userID: user.id})
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
    <Animated.View 
      entering={SlideInRight.delay(400).duration(800)} 
      exiting={SlideOutLeft} 
      style={styles.container} 
    >
      <View style={styles.inputAndButtonContainer}>
        <TextInput onChangeText={newText=> setEntryText(newText)} placeholder="What are you thankful for today?" style={styles.input} value={entryText}></TextInput>
        <Button onPress={createEntry} title="Add" />
      </View>
      {gratitudeEntries && gratitudeEntries.map((entry) => {
        return (
          // TODO: make this a ScrollView
          <View key={entry._id} style={styles.entryTextAndButtonContainer}>
            <Text>- {entry.gratitudeDescription}</Text>
            <Pressable onPress={(event) => deleteEntry(event, entry._id)} style={styles.deleteButton}><Text style={styles.deleteButtonText}>x</Text></Pressable>
          </View>
        )
      })}
    </Animated.View>
  )
}

export default GratitudesFormAndList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eaf4f4",
    borderRadius: 16,
    height: 300,
    padding: 16,
    margin: 32
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
  logoutButtonContainer: {
    alignSelf: "flex-end"
  },
  logoutButtonText: {
    color: "#007AFF",
    fontSize: 18,
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
    flexDirection: 'row',
    paddingTop: 64
  },
});

interface GratitudeEntryResponse {
  _id: string,
  favorited: boolean,
  gratitudeDescription: string,
  userID: string,
}
