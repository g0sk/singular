import {PermissionsAndroid} from 'react-native';

export type PermissionResult =
  | 'granted'
  | 'denied'
  | 'never_ask_again'
  | undefined;
type CameraPermissions = {
  cameraPermission: boolean;
  storagePermission: boolean;
};

export const checkCameraPermissions = async (): Promise<CameraPermissions> => {
  const camera = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.CAMERA,
  );
  const storage = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  );
  return {cameraPermission: camera, storagePermission: storage};
};

export const requestCameraPermission = async (): Promise<PermissionResult> => {
  try {
    const cameraPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Camera access',
        message: 'Singular needs to access the device camera',
        buttonPositive: 'Grant access',
        buttonNegative: 'Never grant access',
        buttonNeutral: 'Ask me later',
      },
    );
    if (cameraPermission === PermissionsAndroid.RESULTS.GRANTED) {
      return PermissionsAndroid.RESULTS.GRANTED;
    }
    if (cameraPermission === PermissionsAndroid.RESULTS.DENIED) {
      return PermissionsAndroid.RESULTS.DENIED;
    }
    if (cameraPermission === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      return PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN;
    }
  } catch (error) {
    throw error;
  }
  return undefined;
};

export const requestStoragePermission = async (): Promise<PermissionResult> => {
  try {
    const storagePermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Access',
        message:
          'Singular needs access to the device storage in order to save the photo from the camera',
        buttonPositive: 'Grant access',
        buttonNegative: 'Never grant access',
        buttonNeutral: 'Ask me later',
      },
    );
    if (storagePermission === PermissionsAndroid.RESULTS.GRANTED) {
      return PermissionsAndroid.RESULTS.GRANTED;
    }
    if (storagePermission === PermissionsAndroid.RESULTS.DENIED) {
      return PermissionsAndroid.RESULTS.DENIED;
    }
    if (storagePermission === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      return PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN;
    }
  } catch (error) {
    throw error;
  }
  return undefined;
};
