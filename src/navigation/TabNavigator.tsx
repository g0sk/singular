import * as React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Profile, Scan} from 'screens';
import {useTheme} from 'ui/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {DocumentNavigator} from './DocumentNavigator';
import {TabNavigatorParamList} from 'types';

const Tab = createBottomTabNavigator<TabNavigatorParamList>();
export const TabNavigator = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      initialRouteName="DocumentNavigator"
      tabBarOptions={{
        showLabel: false,
        style: styles.container,
      }}>
      <Tab.Screen
        name="DocumentNavigator"
        component={DocumentNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name={focused ? 'file-tray' : 'file-tray-outline'}
              size={focused ? 34 : 28}
              color={focused ? theme.colors.primary : theme.colors.default}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Scan"
        component={Scan}
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

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    backgroundColor: '#ffffff',
    height: 60,
  },
});
