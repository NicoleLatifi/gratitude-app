import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useApp } from '@realm/react';

const SignUpScreen = () => {
  const app = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    // Handle sign up logic here
    // You can validate the inputs, make an API request, etc.
    console.log('Email:', email);
    console.log('Password:', password);

    const credentials = Realm.Credentials.emailPassword(
      email,
      password
    );
    const user = await app.logIn(credentials)
      .then(user => {
        // User login successful
        console.log('Logged in user:', user);
      })
      .catch(error => {
        // Error occurred during login
        console.error('Error logging in:', error);
      });
  };

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
      <Button title="Sign In" onPress={handleSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
