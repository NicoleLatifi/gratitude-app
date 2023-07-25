import React, { useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useUser } from '@realm/react';
import { useNavigation } from '@react-navigation/native';
import Circle from '../components/Circle';
import { colors } from '../constants'
import GratitudesFormAndList from '../components/GratitudesFormAndList';
import Menu from '../components/Menu';

const DURATION = 1000;
// const TEXT_DURATION = DURATION * 0.8;

const HomeScreen = () => {
  const user = useUser();
  const navigation = useNavigation();

  if (!user) {
    navigation.navigate('SignIn')
  }

  // Animations
  const animatedValue = useRef(new Animated.Value(0)).current;
  const animatedValue2 = useRef(new Animated.Value(0)).current;
  // const sliderAnimatedValue = useRef(new Animated.Value(-300)).current;
  
  const [index, setIndex] = useState(0);

  const animate = (i: number) =>
    Animated.parallel([
      // Animated.timing(sliderAnimatedValue, {
      //   toValue: 0,
      //   duration: TEXT_DURATION,
      //   useNativeDriver: true,
      // }),
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValue2, {
        toValue: 1,
        duration: DURATION,
        useNativeDriver: false,
      }),
    ]);

  const onPress = () => {
    animatedValue.setValue(0);
    animatedValue2.setValue(0);
    animate((index + 1) % colors.length).start();
    setIndex((index + 1) % colors.length);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'flex-start', paddingTop: 100 }}>
      <Circle animatedValue={animatedValue} animatedValue2={animatedValue2} index={index} onPress={onPress} />
      {index === 0 && <GratitudesFormAndList />}
      {index === 1 &&  <Menu />}
    </View>
  )
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    // justifyContent: 'center',
    padding: 32,
    paddingTop: 128,
    borderWidth: 2,
    borderColor: "#00ff00"
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
