import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NewTag, ScanActiveSuccess, ScanHome, ScanTagSuccess} from 'screens';
import {RootScanNavigatorParamList} from 'types';

const Stack = createNativeStackNavigator<RootScanNavigatorParamList>();

const ScanNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="ScanHome"
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
      <Stack.Screen name="ScanHome" component={ScanHome} />
      <Stack.Screen
        name="ScanTagSuccess"
        component={ScanTagSuccess}
        options={({route}) => ({
          headerShown: false,
          title: route.params.title,
        })}
      />
      <Stack.Screen
        name="ScanActiveSuccess"
        component={ScanActiveSuccess}
        options={({route}) => ({
          headerShown: false,
          title: route.params.title,
        })}
      />
      <Stack.Screen
        name="NewTag"
        component={NewTag}
        options={({route}) => ({
          headerShown: true,
          title: route.params.title,
          tag: route.params.tag,
        })}
      />
    </Stack.Navigator>
  );
};

export default ScanNavigator;
