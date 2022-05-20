import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ActiveTypeList, ActiveTypeDetails, NewActiveType} from 'screens';
import {RootActiveTypeParamList} from 'types';

const Stack = createNativeStackNavigator<RootActiveTypeParamList>();

export const ActiveTypeNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="ActiveTypeList"
      screenOptions={{
        presentation: 'card',
        animation: 'slide_from_right',
        headerShown: false,
      }}>
      <Stack.Screen
        name="ActiveTypeList"
        component={ActiveTypeList}
        options={() => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name="ActiveTypeDetails"
        component={ActiveTypeDetails}
        options={({route}) => ({
          headerShown: true,
          title: route.params.title,
          typeId: route.params.typeId,
        })}
      />
      <Stack.Screen
        name="NewActiveType"
        component={NewActiveType}
        options={({route}) => ({
          headerShown: true,
          title: route.params.title,
        })}
      />
    </Stack.Navigator>
  );
};
