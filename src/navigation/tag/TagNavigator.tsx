import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TagNavigatorParamList} from 'types';
import TagTabNavigator from './TagTabNavigator';
import TagErrorNavigator from './TagErrorNavigator';
import {useNfc} from 'core/nfc';

const Stack = createNativeStackNavigator<TagNavigatorParamList>();

const TagNavigator = () => {
  const {supported, enabled} = useNfc();
  return (
    <Stack.Navigator
      initialRouteName="TagTab"
      screenOptions={{headerShown: false}}>
      {supported && enabled ? (
        <Stack.Screen name="TagTab" component={TagTabNavigator} />
      ) : (
        <Stack.Screen name="TagError" component={TagErrorNavigator} />
      )}
    </Stack.Navigator>
  );
};

export default TagNavigator;
