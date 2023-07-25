import React from 'react';
import {Button, Modal, StyleSheet, Text, View} from 'react-native';
import {useApp, useUser} from '@realm/react';
import { useNavigation } from '@react-navigation/native';

const DeleteAccountModal = ({modalVisible, setModalVisible}: {modalVisible: boolean, setModalVisible: (modalVisible: boolean) => void}) => {
  const app = useApp();
  const user = useUser();
  const navigation = useNavigation();

  const deleteUser = async () => {
    await app.deleteUser(user);
    setModalVisible(false)
    navigation.navigate('LoginStack');
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalBodyText}>Are you sure you want to delete your account? This cannot be undone.</Text>
            <Button onPress={deleteUser} title="Yes, delete my account" />
            <Button onPress={() => setModalVisible(!modalVisible)} title="Cancel" />
          </View>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBodyText: {
    fontSize: 20
  },
  modalView: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    padding: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    width: "100%",
  },
});

export default DeleteAccountModal
      