import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useApp } from '@realm/react';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
  const app = useApp();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {
    // TODO: handle email and password validation

    await app.emailPasswordAuth.registerUser({
      email: email,
      password: password,
    });
  };

    const navigateToSignIn = () => {
    navigation.navigate('SignIn')
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
      <TextInput
        autoCapitalize='none'
        style={styles.input}
        placeholder="Confirm Password"
        // secureTextEntry
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
      />
      <View style={styles.buttonsContainer}>
        <Button onPress={handleSignUp} title="Sign Up" />
        <Button onPress={navigateToSignIn} title="Log in with existing account" />
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
  },
});

export default SignUpScreen;
