import React from 'react';
import {Image, Dimensions} from 'react-native';
import {View} from './View';

interface ContainerProps {
  children: React.ReactNode;
}
const image = require('../../assets/images/purple-background.jpg');
//Device screen width
const {width, height} = Dimensions.get('window');
//The aspect ratio depends on the image resolution, this background image is 2731 x 4016
//const aspectRatio = 2731 * 4016;
//const height = width * aspectRatio;

export const Container: React.FC<ContainerProps> = ({children}) => {
  return (
    <View flex={1}>
      {children}
      <Image source={image} style={{width, height}} />
    </View>
  );
};
