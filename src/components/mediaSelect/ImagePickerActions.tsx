//import {ToasAndroid} from 'react-native';
import {
  ImageLibraryOptions,
  CameraOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {
  checkCameraPermissions,
  requestCameraPermission,
  requestStoragePermission,
  PermissionResult,
} from './PermissionUtils';

const openCamera = async () => {
  const cameraOptions: CameraOptions = {
    mediaType: 'photo',
    //maxWidth: 100,
    //maxHeight: 100,
    quality: 1,
    cameraType: 'back',
    saveToPhotos: false,
  };

  let {cameraPermission, storagePermission} = await checkCameraPermissions();
  console.log(cameraPermission, storagePermission);
  if (!cameraPermission) {
    console.log('ask camera perm');
    const cameraResponse: PermissionResult = await requestCameraPermission();
    switch (cameraResponse) {
      case 'granted':
        cameraPermission = true;
        break;
      case 'denied':
        return;
      case 'never_ask_again':
        return;
      case undefined:
        return;
      default:
        return;
    }
    /*
    For storage doesnt matter the permission, its just for saving the photo after
    taking it from the camera.
    */
    if (!storagePermission) {
      console.log('ask camera perm');
      const storageResponse: PermissionResult = await requestStoragePermission();
      switch (storageResponse) {
        case 'granted':
          storagePermission = true;
          cameraOptions.saveToPhotos = true;
          break;
        default:
          storagePermission = false;
          cameraOptions.saveToPhotos = false;
          break;
      }
    }
  }
  if (cameraPermission) {
    launchCamera(cameraOptions, (response) => {
      return response;
    });
  }
};
const openGallery = () => {
  const galleryOptions: ImageLibraryOptions = {
    mediaType: 'photo',
    //maxWidth: 100,
    //maxHeight: 100,
    quality: 1,
  };
  launchImageLibrary(galleryOptions, (response) => {
    return response;
  });
};

export default {
  openCamera,
  openGallery,
};
