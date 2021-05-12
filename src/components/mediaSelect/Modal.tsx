import React, {useState} from 'react';
import {
  Modal,
  ModalProps,
  Pressable,
  Text,
  View,
  StyleSheet,
} from 'react-native';

export const ImagePickerModal: React.FC<ModalProps> = (props) => {
  const [modalVisible, setModalVisible] = useState<boolean | undefined>(
    props.visible,
  );
  return (
    <Modal visible={modalVisible} {...props}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Text style={styles.textHeader}>Select Image</Text>
          </View>
          <View style={styles.options}>
            <Pressable onPress={() => null}>
              <Text style={styles.textOption}>Take picture</Text>
            </Pressable>
            <Pressable onPress={() => null}>
              <Text style={styles.textOption}>Choose from gallery</Text>
            </Pressable>
          </View>
          <View style={styles.button}>
            <Pressable
              onPress={() => {
                setModalVisible(false);
                console.log(modalVisible);
              }}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    textAlign: 'left',
  },
  modalView: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    textAlign: 'left',
  },
  header: {
    paddingVertical: 20,
    paddingLeft: 20,
    paddingRight: 70,
    marginBottom: 20,
  },
  textHeader: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  options: {
    paddingLeft: 20,
    paddingRight: 70,
    marginBottom: 20,
  },
  textOption: {
    marginBottom: 30,
    fontSize: 15,
  },
  button: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  cancelButton: {
    textAlign: 'right',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});
