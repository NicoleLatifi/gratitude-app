import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useApp, useUser } from '@realm/react';
import { Animated, Pressable, StyleSheet, Text } from 'react-native';
import DeleteAccountModal from './DeleteAccountModal';

const Menu = () => {
  const app = useApp();
  const user = useUser();
  const navigation = useNavigation();

  const handleLogout = async () => {
    await app.currentUser?.logOut();
    navigation.navigate('LoginStack')
  }

  const [modalVisible, setModalVisible] = useState(false);

  const slideAnim = useRef(new Animated.Value(500)).current;

  useEffect(() => {
    const delay = 200; // 1000 milliseconds (1 second)

    const startAnimation = () => {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true, // Enable this for better performance on supported platforms
      }).start();
    };

    const timerId = setTimeout(startAnimation, delay);

    // Clean up the timer to avoid memory leaks
    return () => clearTimeout(timerId);
  }, []);

  return (
    <Animated.View style={[styles.container, { transform: [{ translateX: slideAnim }] }]} >
      <DeleteAccountModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
      <Pressable style={styles.logoutButtonContainer} onPress={handleLogout}>
        <Text style={styles.logoutButtonText} >Logout</Text>
      </Pressable>
      <Pressable style={styles.logoutButtonContainer} onPress={() => setModalVisible(true)}>
        <Text style={styles.logoutButtonText} >Delete My Account</Text>
      </Pressable>
    </Animated.View>
  )
}

export default Menu;

const styles = StyleSheet.create({
  container: {
    height: 300,
    justifyContent: "center",
    margin: 32,
    padding: 16,
  },
  logoutButtonContainer: {
    alignSelf: "center",
    backgroundColor: "#eaf4f4",
    borderRadius: 8,
    marginVertical: 8,
    padding: 16,
    width: "100%",
  },
  logoutButtonText: {
    color: "#007AFF",
    fontSize: 18,
    alignSelf: "center",
  }
});



// Move the slide animation to the HomeScreen. That will help with having it slide away to the left as well.