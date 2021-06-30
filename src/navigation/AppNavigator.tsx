import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Profile} from 'screens';
import {TabNavigator} from './TabNavigator';
import {AppNavigatorParamList} from 'types';

const Stack = createStackNavigator<AppNavigatorParamList>();

export const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: true}}>
      <Stack.Screen
        name="Tab"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
};
