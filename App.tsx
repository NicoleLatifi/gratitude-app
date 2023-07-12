import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { UserProvider as RealmUserProvider, AppProvider } from '@realm/react';
import { APP_ID } from '@env';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import LoginStack from './src/stacks/LoginStack';
import { UserProvider } from './src/context/userContext';

export default function App() {
  return (
    <AppProvider id={APP_ID}>
      <UserProvider>
        <NavigationContainer>
          <RealmUserProvider fallback={<LoginStack />} >
              <HomeScreen />
              <StatusBar style="auto" />
          </RealmUserProvider>
        </NavigationContainer>
      </UserProvider>
    </AppProvider>
  );
}
