import React from 'react';
import { Modal, Pressable, StyleSheet, Text, View} from 'react-native';

const DeleteAccountModal = ({modalVisible, setModalVisible}: {modalVisible: boolean, setModalVisible: (modalVisible: boolean) => void}) => {
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
            <Pressable>
              <Text>Yes, delete my account</Text>
            </Pressable>
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text>Hide Modal</Text>
            </Pressable>
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
      