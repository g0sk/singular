import React from 'react';
import {View} from 'components';
import {ErrorHandler} from 'handlers/error';
import {Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const {height, width} = Dimensions.get('window');

export const Screen = ({children}: {children: React.ReactNode}) => (
  <ErrorHandler>
    <SafeAreaView>
      <View height={height} width={width}>
        {children}
      </View>
    </SafeAreaView>
  </ErrorHandler>
);
