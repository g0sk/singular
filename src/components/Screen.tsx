import React from 'react';
import {View} from 'components';
import {ErrorHandler} from 'handlers/error';

//View component to handle app errors

const Screen = ({children}: {children: React.ReactNode}) => (
  <ErrorHandler>
    <View
      justifyContent="center"
      flexDirection="column"
      paddingHorizontal="m"
      flex={1}
      bg="background">
      {children}
    </View>
  </ErrorHandler>
);

export default Screen;
