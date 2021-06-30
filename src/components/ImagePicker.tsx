import React, {useState, useEffect} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  ToastAndroid,
  View,
} from 'react-native';
import {
  launchImageLibrary,
  ImagePickerResponse,
  ImageLibraryOptions,
  CameraOptions,
  launchCamera,
} from 'react-native-image-picker';

import {ParsedImage, ImagePickerProps} from 'types';

export const ImagePicker: React.FC<ImagePickerProps> = ({
  visible,
  setModalVisibility,
  saveImage,
  cameraType = 'back',
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(visible);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  const parseImageResponse = (response: ImagePickerResponse): ParsedImage => {
    //const base64URI = 'data:image/jpg;base64,' + response.base64;
    return {
      base64: response.base64,
      uri: response.uri,
      height: response.height,
      width: response.width,
      fileSize: response.fileSize,
      fileName: response.fileName,
    };
  };

  const errorToast = (errorMessage: string) => {
    ToastAndroid.showWithGravity(
      errorMessage,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
    );
  };

  const hideModal = () => {
    setIsVisible(false);
    setModalVisibility(false);
  };

  const showGallery = () => {
    const libraryOptions: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: true,
      //maxWidth: 100,
      //maxHeight: 100,
      quality: 1,
    };
    launchImageLibrary(libraryOptions, (response: ImagePickerResponse) => {
      if (response.errorCode) {
        hideModal();
        errorToast(response.errorCode);
      }
      if (!response.didCancel) {
        hideModal();
        const parsedImage = parseImageResponse(response);
        saveImage(parsedImage);
      }
      return;
    });
  };
  const showCamera = () => {
    const cameraOptions: CameraOptions = {
      mediaType: 'photo',
      quality: 1,
      cameraType: cameraType,
      includeBase64: true,
      saveToPhotos: true,
    };
    launchCamera(cameraOptions, (response: ImagePickerResponse) => {
      if (response.errorCode) {
        hideModal();
        errorToast(response.errorCode);
      }
      if (!response.didCancel) {
        hideModal();
        const parsedImage = parseImageResponse(response);
        saveImage(parsedImage);
      }
      return;
    });
  };

  return (
    <View style={styles.centeredView}>
      <Modal transparent={true} visible={isVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.header}>
              <Text style={styles.textHeader}>Select Image</Text>
            </View>
            <View style={styles.options}>
              <TouchableOpacity onPress={() => showCamera()}>
                <Text style={styles.textOption}>Take picture</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => showGallery()}>
                <Text style={styles.textOption}>Choose from gallery</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.button}>
              <TouchableOpacity
                onPress={() => {
                  hideModal();
                }}>
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
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    elevation: 0,
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
