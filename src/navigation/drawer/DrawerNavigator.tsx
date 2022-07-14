import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Profile} from 'screens';
import {DrawerNavigatorParamList} from 'types';
import DocumentTabNavigator from '../document/DocumentTabNavigator';
import TagNavigator from '../tag/TagNavigator';
import CustomDrawerContent from 'navigation/drawer/DrawerContent';
import Icon from 'react-native-vector-icons/Ionicons';
import {useTheme} from 'ui/theme';
import {translate} from 'core';
import {useNfc} from 'core/nfc';

const Drawer = createDrawerNavigator<DrawerNavigatorParamList>();

const DrawerNavigator = () => {
  const {colors} = useTheme();
  const {enabled, supported} = useNfc();
  return (
    <Drawer.Navigator
      defaultStatus="closed"
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      backBehavior="none"
      screenOptions={{
        drawerType: 'back',
        headerShown: false,
        drawerLabelStyle: {
          fontWeight: 'bold',
        },
        drawerActiveBackgroundColor: colors.primary,
        drawerActiveTintColor: colors.white,
        drawerInactiveTintColor: colors.darkText,
        drawerItemStyle: {
          marginTop: 20,
        },
      }}>
      <Drawer.Screen
        name="Home"
        component={DocumentTabNavigator}
        options={{
          drawerIcon: ({color}) => (
            <Icon name="folder" size={20} color={color} />
          ),
          drawerLabel: translate('screen.drawer.home'),
        }}
      />
      <Drawer.Screen
        name="Tag"
        component={TagNavigator}
        options={{
          drawerIcon: ({color}) => {
            if (!supported) {
              return <Icon name="warning" size={20} color={colors.error} />;
            } else if (supported && !enabled) {
              return (
                <Icon name="alert-circle" size={20} color={colors.yellow} />
              );
            }
            return <Icon name="radio" size={20} color={color} />;
          },
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
