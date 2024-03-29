import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootWriteNavigatorParamList} from 'types';
import {WriteForm, WriteHome, WriteSuccess} from 'screens';

const Stack = createNativeStackNavigator<RootWriteNavigatorParamList>();

const WriteNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="WriteHome"
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name="WriteHome" component={WriteHome} />
      <Stack.Screen name="WriteForm" component={WriteForm} />
      <Stack.Screen
        name="WriteSuccess"
        component={WriteSuccess}
        options={({route}) => ({
          title: route.params.title,
        })}
      />
    </Stack.Navigator>
  );
};

export default WriteNavigator;
