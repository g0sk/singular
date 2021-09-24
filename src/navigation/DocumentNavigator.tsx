import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Documents, DocumentActive, DocumentType} from 'screens';
import {RootDocumentParamList} from 'types';

const Stack = createStackNavigator<RootDocumentParamList>();

export const DocumentNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Documents"
      headerMode="float"
      screenOptions={{headerShown: false, cardShadowEnabled: true}}>
      <Stack.Screen name="Documents" component={Documents} />
      <Stack.Screen
        name="Active"
        component={DocumentActive}
        options={({route}) => ({
          headerShown: true,
          title: route.params.title,
          active: route.params.active,
        })}
      />
      <Stack.Screen
        name="Type"
        component={DocumentType}
        options={({route}) => ({
          headerShown: true,
          title: route.params.title,
          type: route.params.type,
        })}
      />
    </Stack.Navigator>
  );
};
