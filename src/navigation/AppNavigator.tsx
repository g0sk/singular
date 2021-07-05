import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TabNavigator} from './TabNavigator';
import {AppNavigatorParamList} from 'types';

const Stack = createStackNavigator<AppNavigatorParamList>();

export const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Tab"
        component={TabNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
