import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  TagHome,
  ScanHome,
  Scanning,
  ScanTagSuccess,
  ScanActiveSuccess,
  WriteHome,
  Writting,
  WriteSuccess,
} from 'screens';
import {RootTagParamList} from 'types';

const Stack = createStackNavigator<RootTagParamList>();

export const TagNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="TagHome"
      headerMode="float"
      screenOptions={{headerShown: false, cardShadowEnabled: true}}
      detachInactiveScreens={true}>
      <Stack.Screen name="TagHome" component={TagHome} />
      <Stack.Screen name="ScanHome" component={ScanHome} />
      <Stack.Screen name="Scanning" component={Scanning} />
      <Stack.Screen name="ScanTagSuccess" component={ScanTagSuccess} />
      <Stack.Screen name="ScanActiveSuccess" component={ScanActiveSuccess} />
      <Stack.Screen name="WriteHome" component={WriteHome} />
      <Stack.Screen name="Writting" component={Writting} />
      <Stack.Screen name="WriteSuccess" component={WriteSuccess} />
    </Stack.Navigator>
  );
};
