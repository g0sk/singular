import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ImagePickerModal} from './Modal';

export interface PermissionTypes {
  camera: boolean;
  storage: boolean;
}
type ImagePickerProps = {
  visible: boolean;
};

export const ImagePicker: React.FC<ImagePickerProps> = ({visible}) => {
  return (
    <View style={styles.centeredView}>
      <ImagePickerModal visible={visible} />
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
});
