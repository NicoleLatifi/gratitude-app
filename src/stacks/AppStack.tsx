import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginStack from './LoginStack';
import HomeScreen from '../screens/HomeScreen';

const AppStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="LoginStack" component={LoginStack} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  )
}

export default AppStack;