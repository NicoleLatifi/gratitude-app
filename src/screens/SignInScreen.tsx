import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useUserContext } from '../context/userContext';

const SignInScreen = () => {
  const navigation = useNavigation();
  const { login } = useUserContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    login(email, password);
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
      <Button onPress={handleSignIn} title="Sign In" />
      <Button onPress={navigateToSignUp} title="Create an account" />
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
  }
});

export default SignInScreen;
