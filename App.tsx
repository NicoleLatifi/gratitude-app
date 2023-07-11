import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { UserProvider, AppProvider } from '@realm/react';
import { APP_ID } from '@env';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import LoginStack from './src/stacks/LoginStack';

export default function App() {
  return (
    <AppProvider id={APP_ID}>
      <NavigationContainer>
        <UserProvider fallback={<LoginStack />} >
          <HomeScreen />
          <StatusBar style="auto" />
        </UserProvider>
      </NavigationContainer>
    </AppProvider>
  );
}
