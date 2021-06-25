import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Documents, Document} from 'screens';
import {RootDocumentParamList} from 'types';

const Stack = createStackNavigator<RootDocumentParamList>();

export const DocumentNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Documents"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Documents" component={Documents} />
      <Stack.Screen
        name="Document"
        component={Document}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
};
