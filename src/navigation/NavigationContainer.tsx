import * as React from 'react';
import {NavigationContainer as RNNavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
import {useTheme} from '@shopify/restyle';
import {Theme} from 'ui/Theme';

export const NavigationContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {navigation} = useTheme<Theme>();
  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle={navigation.dark ? 'dark-content' : 'light-content'}
        backgroundColor="grey"
      />
      <RNNavigationContainer theme={navigation}>
        {children}
      </RNNavigationContainer>
    </SafeAreaProvider>
  );
};
