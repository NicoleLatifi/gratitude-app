import React, { useEffect, useState } from 'react';
import {  Button, GestureResponderEvent, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import APIHelper from '../api/APIHelper';
import { useUser } from '@realm/react';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated'
import { AntDesign } from '@expo/vector-icons';
import GratitudeItem from './GratitudeItem';

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
        <View style={styles.inputAndCounterContainer}>
          <TextInput
            maxLength={25} 
            onChangeText={newText=> setEntryText(newText)} 
            placeholder="What are you thankful for today?" 
            placeholderTextColor="#22223b"
            style={styles.input} 
            value={entryText} 
          />
          <Text style={styles.counterText}>{`${entryText.length}`}/25</Text>
        </View>
        <Pressable onPress={createEntry} style={{ justifyContent: 'center', padding: 8, paddingBottom: 16}} >
          <AntDesign color= "#eaf4f4" name="pluscircleo" size={30} />
        </Pressable>
      </View>
      <ScrollView>
        {gratitudeEntries && gratitudeEntries.map((entry) => {
          return (
            // <View key={entry._id} style={styles.entryTextAndButtonContainer}>
            //   <Text 
            //     adjustsFontSizeToFit={true}
            //     minimumFontScale={0.5} 
            //     numberOfLines={1}
            //     style={styles.text}
            //   >
            //     {entry.gratitudeDescription}
            //   </Text>
            //   <Pressable onPress={(event) => deleteEntry(event, entry._id)} style={styles.deleteButton}><Text style={styles.deleteButtonText}>x</Text></Pressable>
            // </View>
            <GratitudeItem 
              key={entry._id}
              entry={entry} 
              onPressDelete={(event) => deleteEntry(event, entry._id)}
            />
          )
        })}
      </ScrollView>
    </Animated.View>
  )
}

export default GratitudesFormAndList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eaf4f4",
    borderColor: "#22223b",
    borderRadius: 16,
    // borderWidth: 1,
    height: 420,
    margin: 16,
    paddingBottom: 1,
  },
  counterText: {
    alignSelf: "flex-end",
    color: "#eaf4f4",
    fontSize: 10,
    paddingRight: 2,
  },
  deleteButton: {
    paddingHorizontal: 8,
  },
  deleteButtonText: {
    color: 'blue'
  },
  logoutButtonContainer: {
    alignSelf: "flex-end"
  },
  logoutButtonText: {
    color: "#007AFF",
    fontSize: 18,
  },
  input: {
    // backgroundColor: '#7392b7', // like Little Gratitudes color
    // backgroundColor: "#b8d0eb", // good light purple/blue
    // backgroundColor: "#037171", // cool green
    backgroundColor: "#6a8d92", // lighter green
    // backgroundColor: "#395e66",
    borderColor: "#22223b",
    // borderTopLeftRadius: 4,
    // borderTopRightRadius: 4,
    borderRadius: 8,
    // borderLeftWidth: 0,
    // borderRightWidth: 0,
    // borderTopWidth: 0,
    borderWidth: 1,
    color: "#22223b",
    height: 60,
    paddingHorizontal: 8,
  },
  inputAndButtonContainer: {
    // backgroundColor: "#22223b",
    // backgroundColor: "#037171", //cool green
    backgroundColor: "#395e66",
    // backgroundColor: "#6a8d92",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    flexDirection: 'row',
    padding: 16,
    paddingBottom: 8,
  },
  inputAndCounterContainer: {
    flexDirection: 'column',
    flex: 1,
  },
});

export interface GratitudeEntryResponse {
  _id: string,
  favorited: boolean,
  gratitudeDescription: string,
  userID: string,
}
