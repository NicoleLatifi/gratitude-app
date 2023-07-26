import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { GratitudeEntryResponse } from './GratitudesFormAndList';

interface GratituteItemProps {
  entry: GratitudeEntryResponse;
  onPressDelete: any;
}

const GratitudeItem = ({ entry, onPressDelete }: GratituteItemProps): JSX.Element => {
  return (
    <View style={styles.entryTextAndButtonContainer}>
      <Text 
        adjustsFontSizeToFit={true}
        minimumFontScale={0.5} 
        numberOfLines={1}
        style={styles.text}
      >
        {entry.gratitudeDescription}
      </Text>
      <Pressable onPress={onPressDelete} style={{ justifyContent: 'center', padding: 8}} >
        <AntDesign color="#22223b" name="delete" size={30} />
      </Pressable>
  </View>
  )
}

export default GratitudeItem;

const styles = StyleSheet.create({
  entryTextAndButtonContainer: {
    alignItems: "center",
    // backgroundColor: "#cad2c5",
    // backgroundColor: "#9ba0bc",
    backgroundColor: "#bdd4e7",
    // borderColor: "#22223b",
    borderRadius: 4,
    // borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    minHeight: 61,
    // marginTop: 8,
    // marginHorizontal: 8,
    margin: 8,
    paddingHorizontal: 16,
  },
  text: {
    color: "#22223b",
    fontSize: 24,
  },
});
