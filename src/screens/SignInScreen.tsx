import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '@realm/react';

const SignInScreen = () => {
  const app = useApp();
  const navigation = useNavigation();

  const [email, setEmail] = useState('Nicole.Latifi@gmail.com');
  const [password, setPassword] = useState('password123');

  const handleSignIn = async () => {
    const credentials = Realm.Credentials.emailPassword(email, password);

    await app.logIn(credentials);
    navigation.navigate('HomeScreen')
  };

  const navigateToSignUp = () => {
    navigation.navigate('SignUp')
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        autoCapitalize='none'
        style={styles.input}
        placeholder="Password"
        // secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <View style={styles.buttonsContainer} >
        <Button onPress={handleSignIn} title="Sign In" />
        <Button onPress={navigateToSignUp} title="Create an account" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    height: 80,
    justifyContent: "space-between"
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 32,
  },
  input: {
    borderColor: 'gray',
    borderRadius: 8,
    borderWidth: 1,
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 8,
    width: '100%',
  }
});

export default SignInScreen;
