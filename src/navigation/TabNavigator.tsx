import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Profile} from 'screens';
import {HomeIcon} from 'ui/icons';
import {StyleSheet} from 'react-native';

const Tab = createBottomTabNavigator();
export const TabNavigator = () => {
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
          tabBarIcon: ({focused}) => <HomeIcon active={focused} />,
        }}
      />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    bottom: 15,
    right: 20,
    left: 20,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    height: 90,
  },
});
