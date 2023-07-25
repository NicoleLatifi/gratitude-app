import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { UserProvider as RealmUserProvider, AppProvider } from '@realm/react';
import { APP_ID } from '@env';
import { NavigationContainer } from '@react-navigation/native';
import LoginStack from './src/stacks/LoginStack';
import AppStack from './src/stacks/AppStack';

export default function App() {
  return (
    <AppProvider id={APP_ID}>
        <NavigationContainer>
          <RealmUserProvider fallback={<LoginStack />} >
              <AppStack />
              <StatusBar style="auto" />
          </RealmUserProvider>
        </NavigationContainer>
    </AppProvider>
  );
}
