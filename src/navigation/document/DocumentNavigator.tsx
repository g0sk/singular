import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ActiveList,
  ActiveDetails,
  NewActive,
  RecordList,
  RecordDetails,
  RecordStats,
} from 'screens';
import {RootDocumentParamList} from 'types';

const Stack = createNativeStackNavigator<RootDocumentParamList>();

export const DocumentNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="ActiveList"
      screenOptions={{
        presentation: 'card',
        animation: 'slide_from_right',
        headerShown: false,
      }}>
      <Stack.Screen
        name="ActiveList"
        component={ActiveList}
        initialParams={{tab: 'active'}}
      />
      <Stack.Screen
        name="ActiveDetails"
        component={ActiveDetails}
        options={({route}) => ({
          headerShown: true,
          title: route.params.title,
          activeId: route.params.activeId,
          recordId: route.params.recordId,
        })}
      />
      <Stack.Screen
        name="NewActive"
        component={NewActive}
        options={({route}) => ({
          headerShown: true,
          title: route.params.title,
        })}
      />

      <Stack.Screen
        name="RecordList"
        component={RecordList}
        options={({route}) => ({
          headerShown: true,
          recordId: route.params.recordId,
          activeId: route.params.activeId,
          title: route.params.title,
        })}
      />

      <Stack.Screen
        name="RecordDetails"
        component={RecordDetails}
        options={({route}) => ({
          headerShown: true,
          recordActive: route.params.recordActive,
          title: route.params.title,
        })}
      />
      <Stack.Screen
        name="RecordStats"
        component={RecordStats}
        options={({route}) => ({
          headerShown: true,
          recordId: route.params.recordId,
        })}
      />
    </Stack.Navigator>
  );
};
