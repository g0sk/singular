import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAuth} from 'core';
import NavigationContainer from '../NavigationContainer';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';

const Stack = createNativeStackNavigator();

export const Root = () => {
  const {status} = useAuth();
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerShown: false,
      }}>
      {status === 'signIn' ? (
        <Stack.Group>
          <Stack.Screen name="App" component={DrawerNavigator} />
        </Stack.Group>
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};

export const RootNavigator = () => (
  <NavigationContainer>
    <Root />
  </NavigationContainer>
);
