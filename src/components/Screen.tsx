import React from 'react';
import {View} from 'components';
import {ErrorHandler} from 'handlers/error';
import {Dimensions} from 'react-native';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
export const Screen = ({children}: {children: React.ReactNode}) => (
  <ErrorHandler>
    <View height={HEIGHT} width={WIDTH}>
      {children}
    </View>
  </ErrorHandler>
);
