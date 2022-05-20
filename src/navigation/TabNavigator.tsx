import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Profile} from 'screens';
import {useTheme} from 'ui/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {DocumentNavigator} from './DocumentNavigator';
import {TagNavigator} from './TagNavigator';
import {ActiveTypeNavigator} from './ActiveTypeNavigator';
import {TabNavigatorParamList} from 'types';

const Tab = createBottomTabNavigator<TabNavigatorParamList>();
const TabNavigator = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="DocumentNavigator"
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
      <Tab.Screen
        name="DocumentNavigator"
        component={DocumentNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name={focused ? 'file-tray-full' : 'file-tray-full-outline'}
              size={focused ? 34 : 28}
              color={focused ? theme.colors.primary : theme.colors.default}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ActiveTypeNavigator"
        component={ActiveTypeNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name={focused ? 'pricetags' : 'pricetags-outline'}
              size={focused ? 34 : 28}
              color={focused ? theme.colors.primary : theme.colors.default}
            />
          ),
        }}
      />
      <Tab.Screen
        name="TagNavigator"
        component={TagNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name={focused ? 'radio' : 'radio-outline'}
              size={focused ? 34 : 28}
              color={focused ? theme.colors.primary : theme.colors.default}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name={focused ? 'person-circle' : 'person-circle-outline'}
              size={focused ? 34 : 28}
              color={focused ? theme.colors.primary : theme.colors.default}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
