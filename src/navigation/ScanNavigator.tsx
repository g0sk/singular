import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {TagHome, TagScan, TagWrite} from 'screens';
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
      <Stack.Screen name="TagScan" component={TagScan} />
      <Stack.Screen name="TagWrite" component={TagWrite} />
    </Stack.Navigator>
  );
};
