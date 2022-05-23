import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TagTabNavigatorParamList} from 'types';
import ScanNavigator from './ScanNavigator';
import WriteNavigator from './WriteNavigator';
import {useTheme} from 'ui/theme';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createBottomTabNavigator<TagTabNavigatorParamList>();
const TagTabNavigator = () => {
  const {colors} = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="Scan"
      detachInactiveScreens={false}
      screenOptions={{
        lazy: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          flex: 1,
          backgroundColor: '#ffffff',
          height: 60,
        },
        headerShown: false,
      }}>
      <Stack.Screen
        name="Scan"
        component={ScanNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name={focused ? 'radio' : 'radio-outline'}
              size={focused ? 34 : 28}
              color={focused ? colors.primary : colors.default}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Write"
        component={WriteNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name={focused ? 'push' : 'push-outline'}
              size={focused ? 34 : 28}
              color={focused ? colors.primary : colors.default}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default TagTabNavigator;
