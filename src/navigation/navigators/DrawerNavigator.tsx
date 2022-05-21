import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Profile} from 'screens';
import {DrawerNavigatorParamList} from 'types';
import TabNavigator from './TabNavigator';
import CustomDrawerContent from 'navigation/DrawerContent';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from 'ui/theme';
import {translate} from 'core';
import {TagNavigator} from './TagNavigator';

const Drawer = createDrawerNavigator<DrawerNavigatorParamList>();

const DrawerNavigator = () => {
  const theme = useTheme();
  return (
    <Drawer.Navigator
      defaultStatus="closed"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      backBehavior="none"
      screenOptions={{
        drawerType: 'back',
        headerShown: false,
        drawerLabelStyle: {
          fontWeight: 'bold',
        },
        drawerActiveBackgroundColor: theme.colors.darkPurple,
        drawerActiveTintColor: theme.colors.white,
        drawerInactiveTintColor: theme.colors.darkText,
        drawerItemStyle: {
          marginTop: 20,
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
          drawerIcon: ({color}) => <Icon name="home" size={20} color={color} />,
          drawerLabel: translate('screen.drawer.home'),
        }}
      />
      <Drawer.Screen
        name="Tag"
        component={TagNavigator}
        options={{
          drawerIcon: ({color}) => (
            <Icon name="radio" size={20} color={color} />
          ),
          drawerLabel: translate('screen.drawer.tags'),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({color}) => (
            <Icon name="person" size={20} color={color} />
          ),
          drawerLabel: translate('screen.drawer.profile'),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
