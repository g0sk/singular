import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  TagHome,
  ScanHome,
  ScanTagSuccess,
  ScanActiveSuccess,
  WriteHome,
  WriteSuccess,
  Write,
} from 'screens';
import {RootTagParamList} from 'types';

const Stack = createNativeStackNavigator<RootTagParamList>();

export const TagNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="TagHome"
      screenOptions={{
        animation: 'slide_from_right',
        headerShown: false,
        headerBlurEffect: 'systemChromeMaterial',
      }}>
      <Stack.Screen name="TagHome" component={TagHome} />
      <Stack.Screen
        name="ScanHome"
        component={ScanHome}
        options={({}) => ({
          headerShown: true,
        })}
      />
      <Stack.Screen
        name="ScanTagSuccess"
        component={ScanTagSuccess}
        options={({route}) => ({
          headerShown: true,
          title: route.params.title,
        })}
      />
      <Stack.Screen
        name="ScanActiveSuccess"
        component={ScanActiveSuccess}
        options={({route}) => ({
          headerShown: true,
          title: route.params.title,
        })}
      />
      <Stack.Screen
        name="WriteHome"
        component={WriteHome}
        options={() => ({
          headerShown: true,
        })}
      />
      <Stack.Screen
        name="Write"
        component={Write}
        options={() => ({
          headerShown: true,
        })}
      />
      <Stack.Screen
        name="WriteSuccess"
        component={WriteSuccess}
        options={({route}) => ({
          headerShown: true,
          title: route.params.title,
        })}
      />
    </Stack.Navigator>
  );
};
