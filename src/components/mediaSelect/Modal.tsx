import React, {Dispatch, useState, useEffect, SetStateAction} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ImagePickerActions from './ImagePickerActions';

interface ModalProps {
  visible: boolean;
  setModalVisibility: Dispatch<SetStateAction<boolean>>;
}

export const ImagePickerModal: React.FC<ModalProps> = ({
  visible,
  setModalVisibility,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(visible);

  useEffect(() => {
    function toogleModal(): void {
      if (visible) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
    toogleModal();
  }, [visible]);

  return (
    <Modal transparent={true} visible={isVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Text style={styles.textHeader}>Select Image</Text>
          </View>
          <View style={styles.options}>
            <TouchableOpacity onPress={() => ImagePickerActions.openCamera()}>
              <Text style={styles.textOption}>Take picture</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => ImagePickerActions.openGallery()}>
              <Text style={styles.textOption}>Choose from gallery</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => {
                setModalVisibility(false);
                setIsVisible(false);
              }}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    textAlign: 'left',
  },
  modalView: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderRadius: 20,
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
