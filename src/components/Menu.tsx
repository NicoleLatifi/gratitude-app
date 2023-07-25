import React, { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useApp, useUser } from '@realm/react';
import { Pressable, StyleSheet, Text } from 'react-native';
import DeleteAccountModal from './DeleteAccountModal';
import Animated, { SlideInRight, SlideOutLeft } from 'react-native-reanimated';

const Menu = () => {
  const app = useApp();
  const user = useUser();
  const navigation = useNavigation();

  const handleLogout = async () => {
    await app.currentUser?.logOut();
    navigation.navigate('LoginStack')
  }

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Animated.View 
      entering={SlideInRight.delay(400).duration(800)} 
      exiting={SlideOutLeft} 
      style={styles.container} 
    >
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
