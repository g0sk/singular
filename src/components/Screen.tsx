import React from 'react';
import {View} from 'react-native';
import {ErrorHandler} from 'handlers/error';

//View component to handle app errors

const Screen = ({children}: {children: React.ReactNode}) => (
  <ErrorHandler>
    <View>{children}</View>
  </ErrorHandler>
);

export default Screen;
