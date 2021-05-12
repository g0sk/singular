import React, {useState, useEffect} from 'react';
import {Modal, Text, StyleSheet, View, TouchableOpacity} from 'react-native';

export interface PermissionTypes {
  camera: boolean;
  storage: boolean;
}
type ImagePickerProps = {
  isVisible: boolean;
};

export const ImagePicker: React.FC<ImagePickerProps> = ({
  isVisible = false,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    console.log(isVisible);
    setModalVisible(isVisible);
  }, [isVisible]);

  return (
    <View style={styles.centeredView}>
      <Modal transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.header}>
              <Text style={styles.textHeader}>Select Image</Text>
            </View>
            <View style={styles.options}>
              <TouchableOpacity onPress={() => null}>
                <Text style={styles.textOption}>Take picture</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => null}>
                <Text style={styles.textOption}>Choose from gallery</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.button}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButton}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
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
