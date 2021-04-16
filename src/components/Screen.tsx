import React from 'react';
import {View} from 'react-native';
import {ErrorHandler} from 'handlers/error';

const Screen = ({children}: {children: React.ReactNode}) => (
  <ErrorHandler>
    <View>{children}</View>
  </ErrorHandler>
);

export default Screen;
