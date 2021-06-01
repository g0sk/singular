import React from 'react';
import {View} from 'components';
import {ErrorHandler} from 'handlers/error';
import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

export const Screen = ({children}: {children: React.ReactNode}) => (
  <ErrorHandler>
    <View height={height} width={width}>
      {children}
    </View>
  </ErrorHandler>
);
