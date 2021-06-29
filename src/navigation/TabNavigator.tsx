import * as React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Scan} from 'screens';
import {useTheme} from 'ui/Theme';
import Icon from 'react-native-vector-icons/Feather';
import {DocumentNavigator} from './DocumentNavigator';
import {TabNavigatorParamList} from 'types';

const Tab = createBottomTabNavigator<TabNavigatorParamList>();
export const TabNavigator = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: styles.container,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="home"
              size={25}
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
              name="bluetooth"
              size={25}
              color={focused ? theme.colors.primary : theme.colors.default}
            />
          ),
        }}
      />
      <Tab.Screen
        name="DocumentNavigator"
        component={DocumentNavigator}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              name="file"
              size={25}
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
