import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Profile} from 'screens';
import {TabNavigator} from './TabNavigator';
import {AppNavigatorParamList} from 'types';

const Stack = createStackNavigator<AppNavigatorParamList>();

export const AppNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Tab" component={TabNavigator} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};
