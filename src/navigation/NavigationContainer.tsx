import * as React from 'react';
import {NavigationContainer as RNNavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useTheme} from '@shopify/restyle';
import {Theme} from 'ui/theme';

const NavigationContainer = ({children}: {children: React.ReactNode}) => {
  const {navigation} = useTheme<Theme>();
  return (
    <SafeAreaProvider>
      <RNNavigationContainer theme={navigation}>
        {children}
      </RNNavigationContainer>
    </SafeAreaProvider>
  );
};

export default NavigationContainer;
