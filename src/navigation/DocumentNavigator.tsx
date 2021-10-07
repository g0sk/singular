import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  DocumentList,
  ActiveDetails,
  ActiveNewItem,
  ActiveTypeDetails,
  ActiveTypeNewItem,
} from 'screens';
import {RootDocumentParamList} from 'types';

const Stack = createStackNavigator<RootDocumentParamList>();

export const DocumentNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="DocumentList"
      headerMode="float"
      screenOptions={{headerShown: false, cardShadowEnabled: true}}>
      <Stack.Screen name="DocumentList" component={DocumentList} />
      <Stack.Screen
        name="ActiveDetails"
        component={ActiveDetails}
        options={({route}) => ({
          headerShown: true,
          title: route.params.title,
          activeId: route.params.activeId,
        })}
      />
      <Stack.Screen
        name="NewActive"
        component={ActiveNewItem}
        options={({route}) => ({
          headerShown: true,
          title: route.params.title,
        })}
      />
      <Stack.Screen
        name="TagDetails"
        component={ActiveNewItem}
        options={({route}) => ({
          headerShown: true,
          title: route.params.title,
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
        component={ActiveTypeNewItem}
        options={({route}) => ({
          headerShown: true,
          title: route.params.title,
        })}
      />
    </Stack.Navigator>
  );
};
