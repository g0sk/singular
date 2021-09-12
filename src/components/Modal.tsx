import React from 'react';
import {ModalProps} from 'types';
import RNModal from 'react-native-modal';

export const Modal: React.FC<ModalProps> = ({
  children,
  show,
  visibleSetter,
}) => {
  const _onBackdropPressHandler = () => {
    visibleSetter(false);
  };

  return (
    <RNModal
      coverScreen={true}
      isVisible={show}
      hasBackdrop={true}
      backdropColor="black"
      backdropOpacity={0.8}
      animationIn="zoomIn"
      animationOut="zoomOut"
      onBackdropPress={_onBackdropPressHandler}
      children={children}
      useNativeDriver={true}
    />
  );
};
