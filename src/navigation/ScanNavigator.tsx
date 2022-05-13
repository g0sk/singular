import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TagHome, ScanHome, WriteHome} from 'screens';
import {RootTagParamList} from 'types';

const Stack = createNativeStackNavigator<RootTagParamList>();

export const TagNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="TagHome"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="TagHome" component={TagHome} />
      <Stack.Screen name="ScanHome" component={ScanHome} />
      <Stack.Screen name="WriteHome" component={WriteHome} />
    </Stack.Navigator>
  );
};
